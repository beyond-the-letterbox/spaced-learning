import {AuthenticatedRequest} from "../models";
import {Response, Request} from "express";
import {cardsService} from "../services";

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

    public async updateCard(req: Request, res: Response): Promise<void> {
        try {
            const cardId = parseInt(req.params.id, 10);
            const updatedCard = req.body;
            const card = await cardsService.updateCard(cardId, updatedCard);
            res.json(card);
            if (!card) {
                res.status(404).json({ error: 'Card not found' });
            }
        } catch (error) {
            res.status(500).json({error: 'Internal server error'});
        }
    }

    public async deleteCard(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const cardId = parseInt(req.params.id, 10);
            const card = await cardsService.deleteCard(cardId);
            if (!card) {
                res.status(404).json({ error: 'Card not found' });
            }
            res.json({ message: 'Card deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getCardById(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const cardId = parseInt(req.params.id);
            const card = await cardsService.getCardById(cardId);
            if (!card) {
                res.status(404).json({ error: 'Card not found' });
            }
            res.json(card);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const cardsController = new CardsController();
