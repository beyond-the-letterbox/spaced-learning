import { Response } from 'express';
import { AuthenticatedRequest } from '../models';
import { notesService} from '../services';
import {BaseController} from "./base.controller";

export class NotesController extends BaseController {
    public async getNotes(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const userId = this.extractAuthenticatedUserId(req, res);

            if (!userId) {
                return;
            }

            const notes = await notesService.getNotesByUserId(userId);

            res.status(200).json(notes);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }

    }

    public async getNoteById(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const userId = this.extractAuthenticatedUserId(req, res);

            if (!userId) {
                return;
            }

            const noteId = this.getValidatedParameterValue(req, res);

            if (!noteId) {
                return;
            }

            const note = await notesService.getNoteById(userId, noteId);

            res.status(200).json(note);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async createNote(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const userId = this.extractAuthenticatedUserId(req, res);

            if (!userId) {
                return;
            }

            const note = req.body;
            const createdNote = await notesService.createNote(userId, note);

            res.status(201).json(createdNote);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async updateNote(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const userId = this.extractAuthenticatedUserId(req, res);

            if (!userId) {
                return;
            }

            const noteId = this.getValidatedParameterValue(req, res);

            if (!noteId) {
                return;
            }

            const updatedNote = req.body;
            const note = await notesService.updateNote(userId, noteId, updatedNote);

            res.status(200).json({ message: 'Note updated successfully', note });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async deleteNote(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const userId = this.extractAuthenticatedUserId(req, res);

            if (!userId) {
                return;
            }

            const noteId = this.getValidatedParameterValue(req, res);

            if (!noteId) {
                return;
            }

            const deletedNote = await notesService.deleteNote(userId, noteId);

            res.status(200).json({ message: 'Note deleted successfully', note: deletedNote });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const notesController = new NotesController();