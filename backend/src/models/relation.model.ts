import {Note} from "./note.model";

export interface Relation {
    id: number;
    user_id: number;
    from_note_id: number;
    to_node_id: number;
    relation_type: string;
    created_at: Date;
    from_note?: Note;
    to_note?: Note;
}

export type RelationCreatePayload = Omit<Relation, 'id' | 'created_at' | 'updated_at'>;

export type RelationUpdatePayload = Omit<Relation, 'user_id' | 'from_note_id' | 'to_note_id'>;
