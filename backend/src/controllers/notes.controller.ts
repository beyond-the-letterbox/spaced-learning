import { Response } from 'express';
import { AuthenticatedRequest } from '../models';

export class NotesController {
    public async createNote(req: AuthenticatedRequest, res: Response): Promise<void> {

    }


    public async getAllNotes(req: ): Promise<void> {

    }
}

export const notesController = new NotesController();