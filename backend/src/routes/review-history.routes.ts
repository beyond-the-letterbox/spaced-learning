import { Router } from 'express';
import { authenticateToken } from '../middleware';
import { reviewHistoryController } from '../controllers';
import validate from '../middleware/validate.middleware';
import { getReviewHistoryByCardIdSchema, getReviewsSchema } from '../../schemas';

/**
 * @swagger
 * components:
 *   schemas:
 *     ReviewHistory:
 *       type: object
 *       required:
 *         - cardId
 *         - userId
 *         - easeFactor
 *         - interval
 *         - repetitions
 *         - reviewDate
 *         - nextReviewDate
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the review record
 *         cardId:
 *           type: string
 *           description: The ID of the card being reviewed
 *         userId:
 *           type: string
 *           description: The ID of the user who performed the review
 *         easeFactor:
 *           type: number
 *           format: float
 *           description: The ease factor used in the spaced repetition algorithm
 *         interval:
 *           type: integer
 *           description: The interval (in days) until the next review
 *         repetitions:
 *           type: integer
 *           description: The number of successful reviews in a row
 *         reviewDate:
 *           type: string
 *           format: date-time
 *           description: The date and time when the review was performed
 *         nextReviewDate:
 *           type: string
 *           format: date-time
 *           description: The scheduled date for the next review
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the record was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the record was last updated
 *       example:
 *         id: 60d21b4667d0d8992e610c85
 *         cardId: 60d21b4667d0d8992e610c83
 *         userId: 60d21b4667d0d8992e610c84
 *         easeFactor: 2.5
 *         interval: 1
 *         repetitions: 0
 *         reviewDate: 2023-05-01T12:00:00Z
 *         nextReviewDate: 2023-05-02T12:00:00Z
 *         createdAt: 2023-05-01T12:00:00Z
 *         updatedAt: 2023-05-01T12:00:00Z
 *
 *     CreateReviewInput:
 *       type: object
 *       required:
 *         - cardId
 *         - easeFactor
 *         - interval
 *         - repetitions
 *         - nextReviewDate
 *       properties:
 *         cardId:
 *           type: string
 *           description: The ID of the card being reviewed
 *         easeFactor:
 *           type: number
 *           format: float
 *           description: The ease factor to use in the spaced repetition algorithm
 *         interval:
 *           type: integer
 *           description: The interval (in days) until the next review
 *         repetitions:
 *           type: integer
 *           description: The number of successful reviews in a row
 *         nextReviewDate:
 *           type: string
 *           format: date-time
 *           description: The scheduled date for the next review
 *       example:
 *         cardId: 60d21b4667d0d8992e610c83
 *         easeFactor: 2.5
 *         interval: 1
 *         repetitions: 0
 *         nextReviewDate: 2023-05-02T12:00:00Z
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
 * /reviews:
 *   get:
 *     summary: Get all review history records for the authenticated user
 *     tags: [Review History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Maximum number of records to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of records to skip for pagination
 *     responses:
 *       200:
 *         description: List of review history records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReviewHistory'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get(
  '/reviews',
  authenticateToken,
  validate(getReviewsSchema),
  reviewHistoryController.getReviews
);

/**
 * @swagger
 * /reviews/card/{id}:
 *   get:
 *     summary: Get all review history records for a specific card
 *     tags: [Review History]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Card ID to get review history for
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Maximum number of records to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of records to skip for pagination
 *     responses:
 *       200:
 *         description: List of review history records for the specified card
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ReviewHistory'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Card not found or no review history available
 *       500:
 *         description: Internal server error
 */
router.get(
  '/reviews/card/:id',
  authenticateToken,
  validate(getReviewHistoryByCardIdSchema),
  reviewHistoryController.getReviewsByCardId
);

export default router;
