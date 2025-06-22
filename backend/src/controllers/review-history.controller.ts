import { BaseController } from './base.controller';
import { Response } from 'express';
import { AuthenticatedRequest } from '../models';
import { reviewHistoryService } from '../services';

export class ReviewHistoryController extends BaseController {
  public async getReviews(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = this.extractAuthenticatedUserId(req, res);

      if (!userId) {
        return;
      }

      const reviews = await reviewHistoryService.getReviewsByUserId(userId);

      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async getReviewsByCardId(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = this.extractAuthenticatedUserId(req, res);

      if (!userId) {
        return;
      }

      const cardId = this.getValidatedParameterValue(req, res);

      if (!cardId) {
        return;
      }

      const reviews = await reviewHistoryService.getReviewsByCardId(userId, cardId);

      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export const reviewHistoryController = new ReviewHistoryController();
