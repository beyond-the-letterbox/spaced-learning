import { Router } from 'express';
import { cardsController } from '../controllers';
import { authenticateToken } from '../middleware';

const router = Router();

router.get('/', authenticateToken, cardsController.getCards);

router.get('/review', authenticateToken, cardsController.getCardsForReview);

router.get('/:id', authenticateToken, cardsController.getCardById);

router.post('/', authenticateToken, cardsController.createCard);

router.put('/:id', authenticateToken, cardsController.updateCard);

router.put('/:id/review', authenticateToken, cardsController.processCardReview);

router.delete('/:id', authenticateToken, cardsController.deleteCard);

export default router;
