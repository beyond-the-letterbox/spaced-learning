import { Response } from 'express';
import { AuthenticatedRequest } from '../models';
import { notesService } from '../services';
import { BaseController } from './base.controller';

export class NotesController extends BaseController {
  public getNotes = async(req: AuthenticatedRequest, res: Response): Promise<void> => {
      const userId = this.extractAuthenticatedUserId(req, res);

      const data = await notesService.getNotesByUserId(userId);

      res.status(200).json({ status: 'success', data });
  }

  public getNoteById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
      const userId = this.extractAuthenticatedUserId(req, res);

      const noteId = this.getValidatedParameterValue(req, res);

      const data = await notesService.getNoteById(userId, noteId);

      res.status(200).json({ status: 'success', data });
  }

  public createNote = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
     const userId = this.extractAuthenticatedUserId(req, res);

      const note = req.body;

      const data = await notesService.createNote(userId, note);

      res.status(201).json({ status: 'success', data });
  }

  public updateNote = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
      const userId = this.extractAuthenticatedUserId(req, res);

      const noteId = this.getValidatedParameterValue(req, res);

      const updatedNote = req.body;

      const data = await notesService.updateNote(userId, noteId, updatedNote);

      res.status(200).json({ status: 'success', data });
  }

  public deleteNote = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
      const userId = this.extractAuthenticatedUserId(req, res);

      const noteId = this.getValidatedParameterValue(req, res);

      const data = await notesService.deleteNote(userId, noteId);

      res.status(200).json({ status: 'success', data });
  }
}

export const notesController = new NotesController();
