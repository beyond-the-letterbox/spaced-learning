import { PrismaClient } from '@prisma/client';
import { Card, CardUpdatePayload, CardCreatePayload, User } from '../models';
import { Decimal } from '@prisma/client/runtime/library';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export class CardsService {
  #prisma!: PrismaClient;

  constructor() {
    this.#prisma = new PrismaClient();
  }

  public async getCardsByUserId(userId: User['id']): Promise<Card[]> {
    const cards = await this.#prisma.cards.findMany({
      where: {
        user_id: userId
      }
    });

    if (!cards) {
      throw new Error('No cards found');
    }

    return cards;
  }

  public async getCardById(userId: User['id'], cardId: number): Promise<Card> {
    const card = await this.#prisma.cards.findUnique({
      where: {
        id: cardId,
        user_id: userId
      }
    });

    if (!card) {
      throw new Error('Card not found or user has no permission to view it');
    }

    return card;
  }

  public async getCardsForReview(userId: User['id']): Promise<Card[]> {
    const now = new Date();

    const cards = await this.#prisma.cards.findMany({
      where: {
        user_id: userId,
        OR: [
          { due_date: { lte: now } },
          // Include new cards without due_date set yet
          { due_date: null }
        ]
      },
      orderBy: {
        // Show the oldest due cards first
        due_date: 'asc'
      }
    });

    if (!cards || cards.length === 0) {
      throw new Error('No cards found');
    }

    return cards;
  }

  public async processCardReview(
    userId: User['id'],
    cardId: Card['id'],
    reviewRating: number
  ): Promise<Card> {
    return this.#prisma.$transaction(async (prisma) => {
      const card = await prisma.cards.findUnique({
        where: {
          id: cardId,
          user_id: userId
        }
      });

      if (!card) {
        throw new Error('Card not found or user has no permission to view it');
      }

      const reviewedCard = this.getReviewedCard(card, reviewRating);
      const updatedCard = this.calculateNextReviewDate(reviewedCard);

      const [savedCard, review] = await Promise.all([
        prisma.cards.update({
          where: {
            id: cardId,
            user_id: userId
          },
          data: {
            ...updatedCard,
            updated_at: new Date()
          }
        }),
        prisma.review_history.create({
          data: {
            card_id: cardId,
            user_id: userId,
            interval: updatedCard.interval,
            ease_factor: updatedCard.ease_factor,
            quality: reviewRating,
            next_due_date: updatedCard.due_date as Date,
            review_date: new Date()
          }
        })
      ]);

      if (!savedCard) {
        throw new Error('Failed to update card');
      }

      return savedCard;
    });
  }

  public async createCard(userId: User['id'], card: CardCreatePayload): Promise<Card> {
    const createdCard = await this.#prisma.cards.create({
      data: {
        ...card,
        user_id: userId
      }
    });

    if (!createdCard) {
      throw new Error('Failed to create card');
    }

    return createdCard;
  }

  public async updateCard(
    userId: User['id'],
    cardId: number,
    data: CardUpdatePayload
  ): Promise<Card> {
    const card = await this.#prisma.cards.update({
      where: {
        id: cardId,
        user_id: userId
      },
      data
    });

    if (!card) {
      throw new Error('Card not found or user has no permission to update it');
    }

    return card;
  }

  public async deleteCard(userId: User['id'], cardId: number): Promise<Card> {
    const card = await this.#prisma.cards.delete({
      where: {
        id: cardId,
        user_id: userId
      }
    });

    if (!card) {
      throw new Error('Card not found or user has no permission to delete it');
    }

    return card;
  }

  private getReviewedCard(card: Card, reviewRating: number): Card {
    const { ease_factor, repetitions, interval } = card;

    // Possible review rating 1-5
    if (reviewRating >= 3) {
      return {
        ...card,
        interval:
          repetitions === 0
            ? 1
            : repetitions === 1
              ? 6
              : Math.round(interval * Number(ease_factor)),
        repetitions: repetitions + 1,
        ease_factor: Math.max(
          1.3,
          Number(ease_factor) + (0.1 - (5 - reviewRating) * (0.08 + (5 - reviewRating) * 0.02))
        ) as unknown as Decimal
      };
    }

    return {
      ...card,
      repetitions: 0,
      interval: 1
    };
  }

  private calculateNextReviewDate(card: Card): Card {
    const { interval, due_date } = card;

    return {
      ...card,
      due_date: new Date(Date.now() + interval * DAY_IN_MS)
    };
  }
}

export const cardsService = new CardsService();
