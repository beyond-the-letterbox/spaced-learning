import { z } from 'zod';

const noteParams = z.object({
  id: z.coerce
    .number({ invalid_type_error: 'Note ID must be a number' })
    .int()
    .positive({ message: 'Note ID must be greater than 0' })
});

export const createNoteBody = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(255, { message: 'Title cannot exceed 255 chars' }),
  content: z.string().optional()
});

export const updateNoteBody = createNoteBody
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one of title or content must be provided'
  });

export const getNotesSchema = z.object({});

export const getNoteByIdSchema = z.object({
  params: noteParams
});

export const createNoteSchema = z.object({
  body: createNoteBody
});

export const updateNoteSchema = z.object({
  params: noteParams,
  body: updateNoteBody
});

export const deleteNoteSchema = z.object({
  params: noteParams
});
