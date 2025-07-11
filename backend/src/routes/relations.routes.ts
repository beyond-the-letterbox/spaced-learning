import { Router } from 'express';
import { authenticateToken } from '../middleware';
import { relationsController } from '../controllers';
import validate from '../middleware/validate.middleware';
import {
  createRelationSchema,
  deleteRelationSchema,
  getRelationByIdSchema,
  getRelationsByNoteId,
  getRelationsByTypeSchema,
  getRelationsSchema,
  updateRelationSchema
} from '../../schemas';
import { catchAsync } from '../utils';

/**
 * @swagger
 * components:
 *   schemas:
 *     Relation:
 *       type: object
 *       required:
 *         - sourceId
 *         - targetId
 *         - type
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the relation
 *         sourceId:
 *           type: string
 *           description: The ID of the source note/card
 *         targetId:
 *           type: string
 *           description: The ID of the target note/card
 *         type:
 *           type: string
 *           description: The type of relation
 *         metadata:
 *           type: object
 *           description: Additional metadata for the relation
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the relation was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the relation was last updated
 *       example:
 *         id: 60d21b4667d0d8992e610c85
 *         sourceId: 60d21b4667d0d8992e610c83
 *         targetId: 60d21b4667d0d8992e610c84
 *         type: "references"
 *         metadata: {}
 *         createdAt: 2023-05-01T12:00:00Z
 *         updatedAt: 2023-05-01T12:00:00Z
 *
 *     CreateRelationInput:
 *       type: object
 *       required:
 *         - sourceId
 *         - targetId
 *         - type
 *       properties:
 *         sourceId:
 *           type: string
 *           description: The ID of the source note/card
 *         targetId:
 *           type: string
 *           description: The ID of the target note/card
 *         type:
 *           type: string
 *           description: The type of relation
 *         metadata:
 *           type: object
 *           description: Additional metadata for the relation
 *       example:
 *         sourceId: 60d21b4667d0d8992e610c83
 *         targetId: 60d21b4667d0d8992e610c84
 *         type: "references"
 *         metadata: {}
 *
 *     UpdateRelationInput:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           description: The updated type of relation
 *         metadata:
 *           type: object
 *           description: Updated metadata for the relation
 *       example:
 *         type: "updated_reference"
 *         metadata: { updated: true }
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

const router = Router();

/**
 * @swagger
 * /relations:
 *   get:
 *     summary: Get all relations for the authenticated user
 *     tags: [Relations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of relations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Relation'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticateToken, validate(getRelationsSchema), catchAsync(relationsController.getRelations));

/**
 * @swagger
 * /relations/{id}:
 *   get:
 *     summary: Get a specific relation by ID
 *     tags: [Relations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Relation ID
 *     responses:
 *       200:
 *         description: The requested relation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Relation'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Relation not found
 *       500:
 *         description: Internal server error
 */
router.get(
  '/:id',
  authenticateToken,
  validate(getRelationByIdSchema),
  catchAsync(relationsController.getRelationById)
);

/**
 * @swagger
 * /relations/type/{type}:
 *   get:
 *     summary: Get relations by type
 *     tags: [Relations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: Type of relation to filter by
 *     responses:
 *       200:
 *         description: List of relations of the specified type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Relation'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get(
  '/type/:type',
  authenticateToken,
  validate(getRelationsByTypeSchema),
  catchAsync(relationsController.getRelationsByType)
);

/**
 * @swagger
 * /relations/note/{id}:
 *   get:
 *     summary: Get all relations for a specific note
 *     tags: [Relations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID to get relations for
 *     responses:
 *       200:
 *         description: List of relations involving the specified note
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Relation'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */
router.get(
  '/note/:id',
  authenticateToken,
  validate(getRelationsByNoteId),
  catchAsync(relationsController.getRelationsByNoteId)
);

/**
 * @swagger
 * /relations:
 *   post:
 *     summary: Create a new relation
 *     tags: [Relations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRelationInput'
 *     responses:
 *       201:
 *         description: The created relation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Relation'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       409:
 *         description: Relation already exists
 *       500:
 *         description: Internal server error
 */
router.post(
  '/',
  authenticateToken,
  validate(createRelationSchema),
  catchAsync(relationsController.createRelation)
);

/**
 * @swagger
 * /relations/{id}:
 *   put:
 *     summary: Update a relation by ID
 *     tags: [Relations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Relation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRelationInput'
 *     responses:
 *       200:
 *         description: The updated relation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Relation'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User doesn't have permission to update this relation
 *       404:
 *         description: Relation not found
 *       500:
 *         description: Internal server error
 */
router.put(
  '/:id',
  authenticateToken,
  validate(updateRelationSchema),
  catchAsync(relationsController.updateRelation)
);

/**
 * @swagger
 * /relations/{id}:
 *   delete:
 *     summary: Delete a relation by ID
 *     tags: [Relations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Relation ID
 *     responses:
 *       204:
 *         description: Relation deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User doesn't have permission to delete this relation
 *       404:
 *         description: Relation not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  '/:id',
  authenticateToken,
  validate(deleteRelationSchema),
  catchAsync(relationsController.deleteRelation)
);

export default router;
