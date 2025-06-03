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

export interface CardCreatePayload {
  note_id: number;
  user_id: number;
  due_data?: Date | null;
  interval?: number;
  ease_factor?: number;
  repetitions?: number;
}

export interface CardUpdatePayload {
  id: number;
  note_id?: number;
  user_id?: number;
  title?: string;
  description?: string | null;
  ease_factor?: number;
  repetitions?: number;
  interval?: number;
  due_date?: Date | null;
}
