import { AuthenticatedRequest } from '../models';
import { Response, Request } from 'express';
import { cardsService } from '../services';

export class CardsController {
  public async getCards(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return Promise.reject(new Error('User not authenticated'));
      }

      const cards = await cardsService.getCardsByUserId(userId);

      res.json(cards);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch cards' });
    }
  }

  public async getCardById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return Promise.reject(new Error('User not authenticated'));
      }

      const cardId = parseInt(req.params.id, 10);
      const card = await cardsService.getCardById(userId, cardId);

      if (!card) {
        res.status(404).json({ error: 'Card not found' });
      }

      res.status(200).json(card);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch card' });
    }
  }

  public async createCard(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return Promise.reject(new Error('User not authenticated'));
      }

      const card = req.body;
      const newCard = await cardsService.createCard(userId, card);
      res.status(201).json(newCard);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create card' });
    }
  }

  public async updateCard(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return Promise.reject(new Error('User not authenticated'));
      }

      const cardId = parseInt(req.params.id, 10);
      const updatedCard = req.body;
      const card = await cardsService.updateCard(cardId, updatedCard);

      if (!card) {
        res.status(404).json({ error: 'Card not found' });
      }

      res.status(200).json({ message: 'Card updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async deleteCard(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return Promise.reject(new Error('User not authenticated'));
      }

      const cardId = parseInt(req.params.id, 10);
      const card = await cardsService.deleteCard(cardId);

      if (!card) {
        res.status(404).json({ error: 'Card not found' });
      }

      res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export const cardsController = new CardsController();
