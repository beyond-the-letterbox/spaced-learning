import { Decimal } from '@prisma/client/runtime/library';

export interface ReviewHistory {
  id: number;
  card_id: number;
  user_id: number;
  review_date: Date;
  quality: number;
  interval: number;
  ease_factor: Decimal;
  next_due_date: Date;
  created_at?: Date;
  updated_at?: Date;
}
