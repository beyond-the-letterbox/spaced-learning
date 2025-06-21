import {PrismaClient} from "@prisma/client";
import {
    Relation,
    RelationCreatePayload,
    RelationTypeEnum,
    RelationWithIncludes,
    User
} from "../models";

export class RelationsService {
    #prisma!: PrismaClient;

    constructor() {
        this.#prisma = new PrismaClient();
    }

    public async createRelation(userId: User['id'], relation: RelationCreatePayload): Promise<Relation> {
        const { relation_types, ...relationData } = relation;

        const createdRelation = await this.#prisma.relations.create({
            data: {
                ...relationData,
                user_id: userId,
                relation_types: {
                    createMany:{
                        data: relation_types.map(type => ({
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
        })

        if (!createdRelation) {
            throw new Error('Failed to create relation');
        }

        return this.mapToRelation(createdRelation);
    }

    private mapToRelation(prismaRelation: RelationWithIncludes) {
        return {
            ...prismaRelation,
            relation_types: prismaRelation.relation_types.map(type => ({
                id: type.id,
                type: type.type as RelationTypeEnum,
                created_at: type.created_at,
            })),
            ...(prismaRelation.source_note && { source_note: prismaRelation.source_note }),
            ...(prismaRelation.target_note && { target_note: prismaRelation.target_note })
        }
    }

}

export const relationsService = new RelationsService();