import {PrismaClient} from "@prisma/client";
import {AuthenticatedRequest} from "../models";
import {Response} from "express";
import {relationsService} from "../services";
import {BaseController} from "./base.controller";

export class RelationsController extends BaseController {
    public async getRelations(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const userId = this.extractAuthenticatedUserId(req, res);

            if (!userId) {
                return;
            }

            const relations = await relationsService.getRelationsByUserId(userId);

            res.status(200).json(relations);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getRelationById(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const userId = this.extractAuthenticatedUserId(req, res);

            if (!userId) {
                return;
            }

            const relationId = this.getValidatedParameterValue(req, res);

            if (!relationId) {
                return;
            }

            const relation = await relationsService.getRelationById(userId, relationId);

            res.status(200).json(relation);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

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

    public async updateRelation(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const userId = this.extractAuthenticatedUserId(req, res);

            if (!userId) {
                return;
            }

            const relationId = this.getValidatedParameterValue(req, res);

            if (!relationId) {
                return;
            }

            const updatedRelation = req.body;
            const relation = relationsService.updateRelation(userId, relationId, updatedRelation);

            res.status(200).json({ message: 'Relation updated successfully', relation });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async deleteRelation(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const userId = this.extractAuthenticatedUserId(req, res);

            if (!userId) {
                return;
            }

            const relationId = this.getValidatedParameterValue(req, res);

            if (!relationId) {
                return;
            }

            const deletedRelation = relationsService.deleteRelation(userId, relationId);

            res.status(200).json({ message: 'Relation deleted successfully', deletedRelation });
        }
        catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const relationsController = new RelationsController();