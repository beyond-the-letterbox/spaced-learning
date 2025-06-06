import { User, Card } from '.';

export interface Note {
  id: number;
  user_id: User['id'];
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  cards: Card[];
  users?: User[];
  edges?: any[];
}
