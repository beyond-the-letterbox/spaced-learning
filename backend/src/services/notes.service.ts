import { PrismaClient } from '@prisma/client';
import { Note, NoteCreatePayload } from '../models';

export class NotesService {
  #prisma!: PrismaClient;

  constructor() {
    this.#prisma = new PrismaClient();
  }

  public async createNote(note: NoteCreatePayload): Promise<Note> {
    const createdNote = await this.#prisma.notes.create({
      data: note
    });

    if (!createdNote) {
      throw new Error('Failed to create note');
    }

    return createdNote;
  }
}

export const notesService = new NotesService();
