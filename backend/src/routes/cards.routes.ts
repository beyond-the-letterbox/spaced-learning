import { Router } from 'express';
import { cardsController } from '../controllers';
import { authenticateToken } from '../middleware';

const router = Router();

router.get('/', authenticateToken, cardsController.getCards);

router.post('/', authenticateToken, cardsController.createCard);

router.get('/:id', authenticateToken, cardsController.getCardById);

router.put('/:id', authenticateToken, cardsController.updateCard);

router.delete('/:id', authenticateToken, cardsController.deleteCard);

export default router;
