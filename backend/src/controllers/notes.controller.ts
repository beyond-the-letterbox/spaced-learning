import { Response } from 'express';
import { AuthenticatedRequest } from '../models';
import {cardsService, notesService} from '../services';
import { PrismaClient } from '@prisma/client';

export class NotesController {
    #prisma!: PrismaClient;

    constructor() {
        this.#prisma = new PrismaClient();
    }

    public async getNotes(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return Promise.reject(new Error('User not authenticated'));
            }

            const notes = await notesService.getNotesByUserId(userId);

            if (!notes) {
                res.status(404).json({ error: 'Notes not found' });
            } else {
                res.status(200).json(notes);
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch notes' });
        }

    }

    public async getNoteById(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return Promise.reject(new Error('User not authenticated'));
            }

            const noteId = parseInt(req.params.id, 10);
            const note = await notesService.getNoteById(userId, noteId);

            if (!note) {
                res.status(404).json({ error: 'Note not found' });
            } else {
                res.status(200).json(note);
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch note' });
        }
    }

    public async createNote(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return Promise.reject(new Error('User not authenticated'));
            }

            const note = req.body;
            const createdNote = notesService.createNote(userId, note);

            res.status(201).json(createdNote);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create note' });
        }
    }

    public async updateNote(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return Promise.reject(new Error('User not authenticated'));
            }

            const noteId = parseInt(req.params.id, 10);
            const updatedNote = req.body;
            const note = await notesService.updateNote(userId, noteId, updatedNote);

            if (!note) {
                res.status(404).json({ error: 'Note not found' });
            }

            res.status(200).json({ message: 'Note updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async deleteNote(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return Promise.reject(new Error('User not authenticated'));
            }

            const noteId = parseInt(req.params.id, 10);
            const deletedNote = await notesService.deleteNote(userId, noteId);

            if (!deletedNote) {
                res.status(404).json({ error: 'Note not found' });
            } else {
                res.status(200).json({ message: 'Note deleted successfully' });
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to delete note' });
        }
    }
}

export const notesController = new NotesController();