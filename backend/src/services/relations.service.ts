import { PrismaClient } from '@prisma/client';
import {
  Relation,
  RelationCreatePayload,
  RelationTypeEnum,
  RelationUpdatePayload,
  RelationWithIncludes,
  User
} from '../models';

export class RelationsService {
  #prisma!: PrismaClient;

  constructor() {
    this.#prisma = new PrismaClient();
  }

  public async getRelationsByUserId(userId: User['id']): Promise<Relation[]> {
    const relations = await this.#prisma.relations.findMany({
      where: {
        user_id: userId
      },
      include: {
        source_note: true,
        target_note: true,
        relation_types: true
      }
    });

    if (!relations) {
      throw new Error('No relations found');
    }

    return relations.map((relation) => this.mapToRelation(relation));
  }

  public async getRelationsByType(
    userId: User['id'],
    relationType: RelationTypeEnum
  ): Promise<Relation[]> {
    const relations = await this.#prisma.relations.findMany({
      where: {
        user_id: userId,
        relation_types: {
          some: {
            type: {
              equals: relationType
            }
          }
        }
      },
      include: {
        source_note: true,
        target_note: true,
        relation_types: true
      }
    });

    return relations.map((relation) => this.mapToRelation(relation));
  }

  public async getRelationById(userId: User['id'], relationId: number): Promise<Relation> {
    const relation = await this.#prisma.relations.findUnique({
      where: {
        id: relationId,
        user_id: userId
      },
      include: {
        source_note: true,
        target_note: true,
        relation_types: true
      }
    });

    if (!relation) {
      throw new Error('Relation not found or user has no permission to view it');
    }

    return this.mapToRelation(relation);
  }

  public async getRelationsByNoteId(userId: User['id'], noteId: number): Promise<Relation[]> {
    const relations = await this.#prisma.relations.findMany({
      where: {
        user_id: userId,
        OR: [
          {
            source_note_id: noteId
          },
          {
            target_note_id: noteId
          }
        ]
      },
      include: {
        source_note: true,
        target_note: true,
        relation_types: true
      }
    });

    if (!relations || relations.length === 0) {
      throw new Error('No relations found for this note');
    }

    return relations.map((relation) => relationsService.mapToRelation(relation));
  }

  public async createRelation(
    userId: User['id'],
    relation: RelationCreatePayload
  ): Promise<Relation> {
    const { relation_types, ...relationData } = relation;

    const createdRelation = await this.#prisma.relations.create({
      data: {
        ...relationData,
        user_id: userId,
        relation_types: {
          createMany: {
            data: relation_types.map((type) => ({
              type: type.type
            }))
          }
        }
      },
      include: {
        source_note: true,
        target_note: true,
        relation_types: true
      }
    });

    if (!createdRelation) {
      throw new Error('Failed to create relation');
    }

    return this.mapToRelation(createdRelation);
  }

  public async updateRelation(
    userId: User['id'],
    relationId: Relation['id'],
    relation: RelationUpdatePayload
  ): Promise<Relation> {
    const { relation_types, ...relationData } = relation;

    const updatedRelation = await this.#prisma.relations.update({
      where: {
        id: relationId,
        user_id: userId
      },
      data: {
        ...relationData,
        relation_types: {
          deleteMany: {},
          createMany: {
            data: relation_types.map((type) => ({
              type: type.type
            }))
          }
        }
      },
      include: {
        source_note: true,
        target_note: true,
        relation_types: true
      }
    });

    if (!updatedRelation) {
      throw new Error('Failed to update relation');
    }

    return this.mapToRelation(updatedRelation);
  }

  public async deleteRelation(userId: User['id'], relationId: number): Promise<Relation> {
    const deletedRelation = await this.#prisma.relations.delete({
      where: {
        id: relationId,
        user_id: userId
      },
      include: {
        source_note: true,
        target_note: true,
        relation_types: true
      }
    });

    if (!deletedRelation) {
      throw new Error('Failed to delete relation');
    }

    return this.mapToRelation(deletedRelation);
  }

  private mapToRelation(prismaRelation: RelationWithIncludes) {
    return {
      ...prismaRelation,
      relation_types: prismaRelation.relation_types.map((type) => ({
        id: type.id,
        type: type.type as RelationTypeEnum,
        created_at: type.created_at
      })),
      ...(prismaRelation.source_note && { source_note: prismaRelation.source_note }),
      ...(prismaRelation.target_note && { target_note: prismaRelation.target_note })
    };
  }
}

export const relationsService = new RelationsService();
