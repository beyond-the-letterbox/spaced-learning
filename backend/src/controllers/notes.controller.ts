import { Response } from 'express';
import { AuthenticatedRequest } from '../models';
import { PrismaClient } from '@prisma/client';

export class NotesController {
    #prisma!: PrismaClient;

    constructor() {
        this.#prisma = new PrismaClient();
    }

    public async createNote(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return Promise.reject(new Error('User not authenticated'));
            }

            const note = req.body;
            const createdNote = await this.#prisma.notes.create({
                data: note
            });
            res.status(201).json(createdNote);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create note' });
        }
    }


    public async getAllNotes(req: ): Promise<void> {

    }
}

export const notesController = new NotesController();