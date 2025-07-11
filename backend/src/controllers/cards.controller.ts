import { AuthenticatedRequest } from '../models';
import { Response } from 'express';
import { cardsService } from '../services';
import { BaseController } from './base.controller';

export class CardsController extends BaseController {
  public getCards = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = this.extractAuthenticatedUserId(req, res);

    const data = await cardsService.getCardsByUserId(userId);

    res.status(200).json({ status: 'success', data });
  }

  public getCardById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = this.extractAuthenticatedUserId(req, res);

    const cardId = this.getValidatedParameterValue(req, res);

    const data = await cardsService.getCardById(userId, cardId);

    res.status(200).json({ status: 'success', data });
  }

  public getCardsForReview = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = this.extractAuthenticatedUserId(req, res);

    const data = await cardsService.getCardsForReview(userId);

    res.status(200).json({ status: 'success', data });
  }

  public processCardReview = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = this.extractAuthenticatedUserId(req, res);

    const cardId = this.getValidatedParameterValue(req, res);

    const reviewRating = req.body;

    const data = await cardsService.processCardReview(userId, cardId, reviewRating);

    res.status(200).json({ status: 'success', data });
  }

  public createCard = async(req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = this.extractAuthenticatedUserId(req, res);

    const card = req.body;

    const data = await cardsService.createCard(userId, card);

    res.status(201).json({ status: 'success', data });
  }

  public updateCard = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = this.extractAuthenticatedUserId(req, res);

    const cardId = this.getValidatedParameterValue(req, res);

    const updatedCard = req.body;

    const data = await cardsService.updateCard(userId, cardId, updatedCard);

    res.status(200).json({ status: 'success', data });
  }

  public deleteCard = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = this.extractAuthenticatedUserId(req, res);

    const cardId = this.getValidatedParameterValue(req, res);

    const data = await cardsService.deleteCard(userId, cardId);

    res.status(200).json({ status: 'success', data });
  }
}

export const cardsController = new CardsController();
