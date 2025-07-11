import { Router } from 'express';
import { authenticateToken } from '../middleware';
import { notesController } from '../controllers';
import validate from '../middleware/validate.middleware';
import {
  createNoteSchema,
  deleteNoteSchema,
  getNoteByIdSchema,
  getNotesSchema,
  updateNoteSchema
} from '../../schemas';
import { catchAsync } from '../utils';

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated ID of the note
 *         title:
 *           type: string
 *           description: The title of the note
 *         content:
 *           type: string
 *           description: The content of the note
 *         userId:
 *           type: string
 *           description: The ID of the user who owns the note
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the note was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the note was last updated
 *       example:
 *         id: 60d21b4667d0d8992e610c85
 *         title: My First Note
 *         content: This is my first note content
 *         userId: 60d21b4667d0d8992e610c84
 *         createdAt: 2023-05-01T12:00:00Z
 *         updatedAt: 2023-05-01T12:00:00Z
 *
 *     CreateNoteInput:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the note
 *           minLength: 1
 *           maxLength: 100
 *         content:
 *           type: string
 *           description: The content of the note
 *           minLength: 1
 *       example:
 *         title: My First Note
 *         content: This is my first note content
 *
 *     UpdateNoteInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The updated title of the note
 *           minLength: 1
 *           maxLength: 100
 *         content:
 *           type: string
 *           description: The updated content of the note
 *           minLength: 1
 *       example:
 *         title: Updated Note Title
 *         content: This is the updated content
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
 * /notes:
 *   get:
 *     summary: Get all notes for the authenticated user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticateToken, validate(getNotesSchema), catchAsync(notesController.getNotes));

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get a specific note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     responses:
 *       200:
 *         description: The requested note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authenticateToken, validate(getNoteByIdSchema), catchAsync(notesController.getNoteById));

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNoteInput'
 *     responses:
 *       201:
 *         description: The created note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticateToken, validate(createNoteSchema), catchAsync(notesController.createNote));

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateNoteInput'
 *     responses:
 *       200:
 *         description: The updated note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User doesn't have permission to update this note
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authenticateToken, validate(updateNoteSchema), catchAsync(notesController.updateNote));

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Note ID
 *     responses:
 *       204:
 *         description: Note deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User doesn't have permission to delete this note
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticateToken, validate(deleteNoteSchema), catchAsync(notesController.deleteNote));

export default router;
