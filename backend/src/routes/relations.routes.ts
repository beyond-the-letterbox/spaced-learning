import { Router } from 'express';
import { authenticateToken } from '../middleware';
import { relationsController } from '../controllers';

const router = Router();

router.get('/', authenticateToken, relationsController.getRelations);

router.get('/:id', authenticateToken, relationsController.getRelationById);

router.get('/type/:type', authenticateToken, relationsController.getRelationsByType);

router.get('/note/:id', authenticateToken, relationsController.getRelationsByNoteId);

router.post('/', authenticateToken, relationsController.createRelation);

router.put('/:id', authenticateToken, relationsController.updateRelation);

router.delete('/:id', authenticateToken, relationsController.deleteRelation);

export default router;
