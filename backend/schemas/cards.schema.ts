import { z } from 'zod';

const cardParams = z.object({
  id: z.coerce
    .number({ invalid_type_error: 'Card ID must be a number' })
    .int()
    .positive({ message: 'Card ID must be greater than 0' }),
});


export const createCardBody = z.object({
  noteId: z.coerce
    .number({ required_error: 'noteId is required', invalid_type_error: 'noteId must be a number' })
    .int()
    .positive({ message: 'noteId must be greater than 0' }),
  title: z
    .string({ required_error: 'title is required' })
    .min(1, { message: 'title cannot be empty' })
    .max(255, { message: 'title is too long' }),
  description: z
    .string({ required_error: 'description is required' })
    .min(1, { message: 'description cannot be empty' }),
});

export const updateCardBody = z.object({
  title: z
    .string({ required_error: 'title is required' })
    .min(1, { message: 'title cannot be empty' })
    .max(255, { message: 'title is too long' }),
  description: z
    .string({ required_error: 'description is required' })
    .min(1, { message: 'description cannot be empty' }),
});

export const processCardReviewBody = z.object({
  rating: z
    .number({ required_error: 'rating is required', invalid_type_error: 'rating must be a number' })
    .min(0)
    .max(5),
});

export const getCardsSchema = z.object({});

export const getCardByIdSchema = z.object({
  params: cardParams,
});

export const getCardsForReviewSchema = z.object({});

export const processCardReviewSchema = z.object({
  params: cardParams,
  body: processCardReviewBody,
});

export const createCardSchema = z.object({
  body: createCardBody,
});

export const updateCardSchema = z.object({
  params: cardParams,
  body: updateCardBody,
});

export const deleteCardSchema = z.object({
  params: cardParams,
});
