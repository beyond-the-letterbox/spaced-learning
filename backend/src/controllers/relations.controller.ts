import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest, RelationTypeEnum } from '../models';
import { Response } from 'express';
import { relationsService } from '../services';
import { BaseController } from './base.controller';

export class RelationsController extends BaseController {
  public async getRelations(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = this.extractAuthenticatedUserId(req, res);

      if (!userId) {
        return;
      }

      const relations = await relationsService.getRelationsByUserId(userId);

      res.status(200).json(relations);
    } catch (error) {
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
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get all relations where note is either the source or the target note
  public async getRelationsByNoteId(req: AuthenticatedRequest, res: Response): Promise<void> {}

  // Filter all relations by type
  public async getRelationsByType(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = this.extractAuthenticatedUserId(req, res);

      if (!userId) {
        return;
      }

      const type = req.params?.type as RelationTypeEnum;

      if (!type) {
        return;
      }

      if (!Object.values(RelationTypeEnum).includes(type)) {
        res.status(400).json({ error: 'Invalid relation type' });
        return;
      }

      const relations = await relationsService.getRelationsByType(userId, type);

      res.status(200).json(relations);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Get graph of related notes
  public async getGraphOfRelatedNotes(req: AuthenticatedRequest, res: Response): Promise<void> {}

  public async createRelation(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = this.extractAuthenticatedUserId(req, res);

      if (!userId) {
        return;
      }

      // Validate both source and target notes exist
      // Check for duplicate relations
      // Ensure a note can't be related to itself

      const relation = req.body;
      const newRelation = relationsService.createRelation(userId, relation);

      res.status(201).json({ message: 'Relation created successfully', relation: newRelation });
    } catch (error) {
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
    } catch (error) {
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

      //            Verify the user has permission to delete the relationship
      //            Clean up any related data

      const deletedRelation = relationsService.deleteRelation(userId, relationId);

      res.status(200).json({ message: 'Relation deleted successfully', deletedRelation });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export const relationsController = new RelationsController();
