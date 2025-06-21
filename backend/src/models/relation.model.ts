import { Prisma } from "@prisma/client";
import {Note} from "./note.model";

export interface RelationType {
    id: number;
    type: RelationTypeEnum;
    created_at: Date;
}

export interface Relation {
    id: number;
    user_id: number;
    source_note_id: number;
    target_note_id: number;
    relation_types: RelationType[];
    created_at: Date;
    source_note?: Note;
    target_note?: Note;
}

export type RelationWithIncludes = Prisma.relationsGetPayload<{
    include: {
        source_note: true;
        target_note: true;
        relation_types: true;
    };
}>;

export type RelationCreatePayload = Omit<Relation, 'id' | 'created_at' | 'updated_at' | 'source_note' | 'target_note'>;

export type RelationUpdatePayload = Omit<Relation, 'user_id' | 'source_note_id' | 'target_note_id'>;

export enum RelationTypeEnum {
    ParentChild = "parent_child",
    DependsOn = "depends_on",
    Linked = "linked",
    Reference = "reference",
    ExampleOf = "example_of",
    Contradicts = "contradicts",
    Supports = "supports",
    Custom = "custom"
}
