import { Router } from 'express';
import { cardsController } from '../controllers';
import { authenticateToken } from '../middleware';

const router = Router();

/**
 * @swagger
 * /api/cards:
 *   get:
 *     summary: Get all cards for the authenticated user
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Card'
 */
router.get('/', authenticateToken, cardsController.getCards);

/**
 * @swagger
 * /api/cards/review:
 *   get:
 *     summary: Get cards due for review
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cards due for review
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Card'
 */
router.get('/review', authenticateToken, cardsController.getCardsForReview);

/**
 * @swagger
 * /api/cards/{id}:
 *   get:
 *     summary: Get a card by ID
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Card ID
 *     responses:
 *       200:
 *         description: Card data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 */
router.get('/:id', authenticateToken, cardsController.getCardById);

/**
 * @swagger
 * /api/cards:
 *   post:
 *     summary: Create a new card
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCardInput'
 *     responses:
 *       201:
 *         description: The created card
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 */
router.post('/', authenticateToken, cardsController.createCard);

/**
 * @swagger
 * /api/cards/{id}:
 *   put:
 *     summary: Update a card
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Card ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCardInput'
 *     responses:
 *       200:
 *         description: The updated card
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 */
router.put('/:id', authenticateToken, cardsController.updateCard);

/**
 * @swagger
 * /api/cards/{id}/review:
 *   put:
 *     summary: Process a card review
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Card ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ease
 *             properties:
 *               ease:
 *                 type: number
 *                 description: Ease factor (1-5)
 *     responses:
 *       200:
 *         description: Review processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 */
router.put('/:id/review', authenticateToken, cardsController.processCardReview);

/**
 * @swagger
 * /api/cards/{id}:
 *   delete:
 *     summary: Delete a card
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Card ID
 *     responses:
 *       204:
 *         description: Card deleted successfully
 *       404:
 *         description: Card not found
 */
router.delete('/:id', authenticateToken, cardsController.deleteCard);

export default router;
