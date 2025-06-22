import { Router } from 'express';
import { authenticateToken } from '../middleware';
import { reviewHistoryController } from '../controllers';

const router = Router();

router.get('/reviews', authenticateToken, reviewHistoryController.getReviews);

router.get('reviews/card/:id', authenticateToken, reviewHistoryController.getReviewsByCardId);

export default router;
