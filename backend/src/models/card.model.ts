export interface Card {
  id: number;
  note_id: number;
  user_id: number;
  title: string;
  description: string | null;
  ease_factor: number;
  repetitions: number;
  interval: number;
  due_date: Date | null;
  created_at: Date;
  updated_at: Date;
}

export type CardCreatePayload = Omit<Card, 'id' | 'created_at' | 'updated_at'>;

export type CardUpdatePayload = Omit<Card, 'created_at' | 'updated_at'>;
