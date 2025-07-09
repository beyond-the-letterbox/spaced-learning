import { z } from 'zod';

export const getReviewsSchema = z.object({});

export const getReviewHistoryByCardIdSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive({ message: 'Card ID must be greater than 0' })
  })
});
