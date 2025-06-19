import { Router } from 'express';
import { authenticateToken } from '../middleware';
import { notesController } from '../controllers';

const router = Router();

router.get('/', authenticateToken, notesController.getNotes);

router.get('/:id', authenticateToken, notesController.getNoteById);

router.post('/', authenticateToken, notesController.createNote);

router.put('/:id', authenticateToken, notesController.updateNote);

router.delete('/:id', authenticateToken, notesController.deleteNote);

export default router;
