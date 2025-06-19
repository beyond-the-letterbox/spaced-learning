import {PrismaClient} from "@prisma/client";
import {Relation, RelationCreatePayload, User} from "../models";

export class RelationsService {
    #prisma!: PrismaClient;

    constructor() {
        this.#prisma = new PrismaClient();
    }

    createRelation(userId: User['id'], relation: RelationCreatePayload): Promise<Relation> {
        const createdRelation = this.#prisma.edges.create({
            data: {
                ...relation,
                user_id: userId
            }
        })

        if (!createdRelation) {
            throw new Error('Failed to create relation');
        }

        return createdRelation;
    }

}

export const relationsService = new RelationsService();