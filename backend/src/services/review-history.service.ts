import { PrismaClient } from '@prisma/client';
import { ReviewHistory, User } from '../models';

export class ReviewHistoryService {
  #prisma!: PrismaClient;

  constructor() {
    this.#prisma = new PrismaClient();
  }

  public async getReviewsByUserId(userId: User['id']): Promise<ReviewHistory[]> {
    const reviews = await this.#prisma.review_history.findMany({
      where: {
        user_id: userId
      }
    });

    if (!reviews) {
      throw new Error('No reviews found');
    }

    return reviews;
  }

  public async getReviewsByCardId(userId: User['id'], cardId: number): Promise<ReviewHistory[]> {
    const reviews = await this.#prisma.review_history.findMany({
      where: {
        card_id: cardId,
        user_id: userId
      },
      orderBy: {
        review_date: 'desc'
      }
    });

    if (!reviews) {
      throw new Error('No reviews found');
    }

    return reviews;
  }
}

export const reviewHistoryService = new ReviewHistoryService();
