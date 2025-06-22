import { AuthenticatedRequest } from '../models';
import { Response, Request } from 'express';
import { cardsService } from '../services';
import { BaseController } from '.';

export class CardsController extends BaseController {
  public async getCards(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = this.extractAuthenticatedUserId(req, res);

      if (!userId) {
        return;
      }

      const cards = await cardsService.getCardsByUserId(userId);

      res.status(200).json(cards);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async getCardById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = this.extractAuthenticatedUserId(req, res);

      if (!userId) {
        return;
      }

      const cardId = this.getValidatedParameterValue(req, res);

      if (!cardId) {
        return;
      }

      const card = await cardsService.getCardById(userId, cardId);

      res.status(200).json(card);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch card' });
    }
  }

  public async getCardsForReview(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = this.extractAuthenticatedUserId(req, res);

      if (!userId) {
        return;
      }

      const cards = await cardsService.getCardsForReview(userId);

      res.status(200).json(cards);
    }
    catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async processCardReview(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = this.extractAuthenticatedUserId(req, res);

      if (!userId) {
        return;
      }

      const cardId = this.getValidatedParameterValue(req, res);

      if (!cardId) {
        return;
      }

      const reviewRating = req.body;

      if (!reviewRating) {
        res.status(400).json({error: 'Review rating is required'});
        return
      }

      const reviewedCard = await cardsService.processCardReview(userId, cardId, reviewRating);

      res.status(200).json({ message: 'Card reviewed successfully', card: reviewedCard });
    }
    catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async createCard(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = this.extractAuthenticatedUserId(req, res);

      if (!userId) {
        return;
      }

      const card = req.body;
      const newCard = await cardsService.createCard(userId, card);

      res.status(201).json({ message: 'Card created successfully', card: newCard });
    } catch (error) {
      res.status(500).json({ error: 'Invalid server error' });
    }
  }

  public async updateCard(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = this.extractAuthenticatedUserId(req, res);

      if (!userId) {
        return;
      }

      const cardId = this.getValidatedParameterValue(req, res);

      if (!cardId) {
        return;
      }

      const updatedCard = req.body;
      const card = await cardsService.updateCard(userId,cardId, updatedCard);

      res.status(200).json({ message: 'Card updated successfully', card });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async deleteCard(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = this.extractAuthenticatedUserId(req, res);

      if (!userId) {
        return;
      }

      const cardId = this.getValidatedParameterValue(req, res);

      if (!cardId) {
        return;
      }

      const deletedCard = await cardsService.deleteCard(userId, cardId);

      res.status(200).json({message: 'Card deleted successfully', card: deletedCard});
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export const cardsController = new CardsController();
