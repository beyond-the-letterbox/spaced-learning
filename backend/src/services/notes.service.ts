import { PrismaClient } from '@prisma/client';
import {Note, NoteCreatePayload, NoteUpdatePayload, User} from '../models';

export class NotesService {
  #prisma!: PrismaClient;

  constructor() {
    this.#prisma = new PrismaClient();
  }

  public async getNotesByUserId(userId: User['id']): Promise<Note[]> {
    const notes = await this.#prisma.notes.findMany({
      where: {
        user_id: userId
      }
    })

    if (!notes) {
      throw new Error('No notes found');
    }

    return notes;
  }

  public async getNoteById(userId: User['id'], noteId: number): Promise<Note> {
    const note = await this.#prisma.notes.findUnique({
      where: {
        id: noteId,
        user_id: userId
      }
    });

    if (!note) {
      throw new Error('Note not found or user has no permission to view it');
    }

    return note;
  }

  public async createNote(userId: User['id'], note: NoteCreatePayload): Promise<Note> {
    const createdNote = await this.#prisma.notes.create({
      // Fix any type
      data: {
        ...note,
        user_id: userId
      } as any
    });

    if (!createdNote) {
      throw new Error('Failed to create note');
    }

    return createdNote;
  }

  public async updateNote(userId: User['id'], noteId: number, data: NoteUpdatePayload): Promise<Note> {
    const updatedNote = await this.#prisma.notes.update({
      where: {
        id: noteId,
        user_id: userId
      },
      // Fix any type
      data: data as any
    });

    if (!updatedNote) {
      throw new Error('Note not found or user has no permission to update it');
    }

    return updatedNote;
  }

  public async deleteNote(userId: User['id'], noteId: number): Promise<Note> {
    const deletedNote = await this.#prisma.notes.delete({
      where: {
        id: noteId,
        user_id: userId
      }
    });

    if (!deletedNote) {
      throw new Error('Note not found or user has no permission to delete it');
    }

    return deletedNote;
  }
}

export const notesService = new NotesService();
