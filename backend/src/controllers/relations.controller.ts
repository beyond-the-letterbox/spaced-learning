import {PrismaClient} from "@prisma/client";
import {AuthenticatedRequest} from "../models";
import {Response} from "express";
import {relationsService} from "../services";
import {BaseController} from "./base.controller";

export class RelationsController extends BaseController {
    public async createRelation(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const userId = this.extractAuthenticatedUserId(req, res);

            if (!userId) {
                return;
            }

            const relation = req.body;
            const newRelation = relationsService.createRelation(userId, relation);

            res.status(201).json({ message: 'Relation created successfully', relation : newRelation });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const relationsController = new RelationsController();