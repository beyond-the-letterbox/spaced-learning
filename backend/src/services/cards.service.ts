import { PrismaClient } from '@prisma/client';
import { Card, CardUpdatePayload, CardCreatePayload, User } from '../models';

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

  public async updateCard(userId: User['id'], cardId: number, data: CardUpdatePayload): Promise<Card> {
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
}

export const cardsService = new CardsService();
