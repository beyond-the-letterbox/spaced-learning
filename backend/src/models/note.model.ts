import { User, Card } from '.';

export interface Note {
  id: number;
  user_id: User['id'];
  title: string;
  content: string | null;
  created_at: Date;
  updated_at: Date;
  cards?: Card[];
  users?: User[];
  relations?: any[];
}

export type NoteCreatePayload = Omit<Note, 'id' | 'created_at' | 'updated_at'>;

export type NoteUpdatePayload = Omit<Note, 'created_at' | 'updated_at'>;
