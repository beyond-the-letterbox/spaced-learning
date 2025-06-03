import { Router } from 'express';
import { cardsController } from '../controllers';
import {authenticateToken} from "../middleware";

const router = Router();

router.get('/', authenticateToken, cardsController.getCards);

router.get('/:id', cardsController.getCard);

router.put('/:id', cardsController.updateCard);

router.delete('/:id', cardsController.deleteCard);

export default router;
