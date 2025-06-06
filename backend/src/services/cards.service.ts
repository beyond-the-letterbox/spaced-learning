import { PrismaClient } from '@prisma/client';
import { Card, CardUpdatePayload, CardCreatePayload, User } from '../models';
import cardsRoutes from '../routes/cards.routes';

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

    return cards as unknown as Card[];
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

    return createdCard as unknown as Card;
  }

  public async updateCard(cardId: number, data: CardUpdatePayload): Promise<Card> {
    const card = await this.#prisma.cards.update({
      where: {
        id: cardId
      },
      data
    });

    if (!card) {
      throw new Error('Card not found');
    }

    return card as unknown as Card;
  }

  public async deleteCard(cardId: number): Promise<Card> {
    const card = await this.#prisma.cards.delete({
      where: {
        id: cardId
      }
    });

    if (!card) {
      throw new Error('Card not found');
    }

    return card as unknown as Card;
  }

  public async getCardById(cardId: number): Promise<Card> {
    const card = await this.#prisma.cards.findUnique({
      where: {
        id: cardId
      }
    });

    if (!card) {
      throw new Error('Card not found');
    }

    return card as unknown as Card;
  }
}

export const cardsService = new CardsService();
