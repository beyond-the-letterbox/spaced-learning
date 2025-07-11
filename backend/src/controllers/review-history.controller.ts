import { BaseController } from './base.controller';
import { Response } from 'express';
import { AuthenticatedRequest } from '../models';
import { reviewHistoryService } from '../services';

export class ReviewHistoryController extends BaseController {
  public getReviews = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
      const userId = this.extractAuthenticatedUserId(req, res);

      const data = await reviewHistoryService.getReviewsByUserId(userId);

      res.status(200).json({ status: 'success', data });
  }

  public getReviewsByCardId = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
      const userId = this.extractAuthenticatedUserId(req, res);

      const cardId = this.getValidatedParameterValue(req, res);

      const data = await reviewHistoryService.getReviewsByCardId(userId, cardId);

      res.status(200).json({ status: 'success', data });
  }
}

export const reviewHistoryController = new ReviewHistoryController();
