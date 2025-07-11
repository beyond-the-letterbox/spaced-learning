import { Decimal } from '@prisma/client/runtime/library';

export interface Card {
  id: number;
  note_id: number;
  user_id: number;
  title: string;
  description: string | null;
  ease_factor: Decimal;
  repetitions: number;
  interval: number;
  due_date: Date | null;
  created_at: Date;
  updated_at: Date;
}

export type CardCreatePayload = {
  user_id: number;
  note_id: number;
  title: string;
  description?: string | null;
  ease_factor?: Decimal;
  repetitions?: number;
  interval?: number;
  due_date?: Date | null;
};

export type CardUpdatePayload = Partial<Omit<Card, 'created_at' | 'updated_at'>> & {
  id: number;
};
