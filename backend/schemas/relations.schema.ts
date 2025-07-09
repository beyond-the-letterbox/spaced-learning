import { z } from 'zod';

const relationParams = z.object({
  id: z.coerce
    .number({ invalid_type_error: 'Relation ID must be a number' })
    .int()
    .positive({ message: 'relation ID must be greater than 0' })
});

export const createRelationBody = z.object({
  source_note_id: z.coerce
    .number({ invalid_type_error: 'Source Note ID must be a number' })
    .int()
    .positive({ message: 'Source Note ID must be greater than 0' }),
  target_note_id: z.coerce
    .number({ invalid_type_error: 'Target Note ID must be a number' })
    .int()
    .positive({ message: 'Target Note ID must be greater than 0' }),
  relation_types: z.array(z.string()).optional(),
  user_id: z.coerce.number().int().positive({ message: 'User ID must be greater than 0' })
});

export const updateRelationBody = z.object({
  source_note_id: z.coerce
    .number({ invalid_type_error: 'Source Note ID must be a number' })
    .int()
    .positive({ message: 'Source Note ID must be greater than 0' }),
  target_note_id: z.coerce
    .number({ invalid_type_error: 'Target Note ID must be a number' })
    .int()
    .positive({ message: 'Target Note ID must be greater than 0' }),
  relation_types: z.array(z.string()).optional(),
  user_id: z.coerce.number().int().positive({ message: 'User ID must be greater than 0' })
});

export const getRelationsSchema = z.object({});

export const getRelationByIdSchema = z.object({
  params: relationParams
});

export const getRelationsByTypeSchema = z.object({
  params: z.object({
    type: z.string()
  })
});

export const getRelationsByNoteId = z.object({
  params: z.object({
    id: z.coerce.number().int().positive({ message: 'Note ID must be greater than 0' })
  })
});

export const createRelationSchema = z.object({
  body: createRelationBody
});

export const updateRelationSchema = z.object({
  params: relationParams,
  body: updateRelationBody
});

export const deleteRelationSchema = z.object({
  params: relationParams
});
