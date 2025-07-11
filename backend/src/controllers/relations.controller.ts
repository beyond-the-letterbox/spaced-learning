import { AuthenticatedRequest, RelationTypeEnum } from '../models';
import { Response } from 'express';
import { relationsService } from '../services';
import { BaseController } from './base.controller';

export class RelationsController extends BaseController {
  public getRelations = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
      const userId = this.extractAuthenticatedUserId(req, res);

      const data = await relationsService.getRelationsByUserId(userId);

      res.status(200).json({ status: 'success', data });
  }

  public getRelationById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = this.extractAuthenticatedUserId(req, res);

      const relationId = this.getValidatedParameterValue(req, res);

      const data = await relationsService.getRelationById(userId, relationId);

      res.status(200).json({ status: 'success', data });
  }

  public getRelationsByNoteId = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = this.extractAuthenticatedUserId(req, res);

    const noteId = this.getValidatedParameterValue(req, res);

    const data = await relationsService.getRelationsByNoteId(userId, noteId);

    res.status(200).json({ status: 'success', data });
  }

  public getRelationsByType = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = this.extractAuthenticatedUserId(req, res);

      const type = req.params?.type as RelationTypeEnum;

      const data = await relationsService.getRelationsByType(userId, type);

      res.status(200).json({ status: 'success', data });
  }

  public async getGraphOfRelatedNotes(req: AuthenticatedRequest, res: Response): Promise<void> {}

  public createRelation = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
      const userId = this.extractAuthenticatedUserId(req, res);

      // Validate both source and target notes exist
      // Check for duplicate relations
      // Ensure a note can't be related to itself

      const relation = req.body;

      const data = relationsService.createRelation(userId, relation);

      res.status(201).json({  status: 'success', data });
  }

  public updateRelation = async(req: AuthenticatedRequest, res: Response): Promise<void> => {
      const userId = this.extractAuthenticatedUserId(req, res);

      const relationId = this.getValidatedParameterValue(req, res);

      const updatedRelation = req.body;

      const data = relationsService.updateRelation(userId, relationId, updatedRelation);

      res.status(200).json({ status: 'success', data });
  }

  public deleteRelation = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
      const userId = this.extractAuthenticatedUserId(req, res);

      const relationId = this.getValidatedParameterValue(req, res);

      const data = relationsService.deleteRelation(userId, relationId);

      res.status(200).json({ status: 'success', data });
  }
}

export const relationsController = new RelationsController();
