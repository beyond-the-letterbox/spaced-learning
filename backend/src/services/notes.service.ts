import { PrismaClient } from '@prisma/client';
import { Note } from '../models';

export class NotesService {
  #prisma!: PrismaClient;

  constructor() {
    this.#prisma = new PrismaClient();
  }

  public async createNote(note: Note): Promise<Note> {
    const createdNote = await this.#prisma.notes.create({
      data: note
    });

    if (!createdNote) {
      throw new Error('Failed to create note');
    }

    return createdNote;
  }

  public async;
}

export const notesService = new NotesService();
