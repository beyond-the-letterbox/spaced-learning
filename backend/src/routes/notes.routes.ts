import { Router } from 'express';
import { authenticateToken } from '../middleware';
import { notesController } from '../controllers';

const router = Router();

router.get('/', authenticateToken, notesController.getAllNotes);

export default router;
