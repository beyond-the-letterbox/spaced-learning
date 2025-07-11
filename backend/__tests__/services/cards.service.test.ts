import { PrismaClient, Prisma } from '@prisma/client';
import { CardsService } from '../../src/services';
import { Card } from '../../src/models';
import { Decimal } from '@prisma/client/runtime/library';

jest.mock('@prisma/client', () => {
  const mockPrisma: any = {
    cards: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    review_history: {
      create: jest.fn(),
    },
    $transaction: jest.fn((callback) => callback(mockPrisma)),
  };
  return {
    PrismaClient: jest.fn(() => mockPrisma),
  };
});

describe('CardsService', () => {
  let cardsService: CardsService;
  let prisma: jest.Mocked<PrismaClient>;

  const mockCard: Card = {
    id: 1,
    note_id: 1,
    user_id: 1,
    title: 'Test Card',
    description: 'Test Card Description',
    interval: 1,
    repetitions: 0,
    ease_factor: 2.5 as unknown as Decimal as unknown as Decimal,
    due_date: new Date(),
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockReviewRating = 4;
  const userId = 1;
  const cardId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
    cardsService = new CardsService();
    prisma = new PrismaClient() as jest.Mocked<PrismaClient>;
  });

  describe('getCardsByUserId', () => {
    it('should return cards for a user', async () => {
      const mockCards: Card[] = [mockCard];
      (prisma.cards.findMany as jest.Mock).mockResolvedValue(mockCards);

      const result = await cardsService.getCardsByUserId(userId);

      expect(prisma.cards.findMany).toHaveBeenCalledWith({
        where: { user_id: userId },
      });
      expect(result).toEqual(mockCards);
    });

    it('should throw an error when no cards are found', async () => {
      (prisma.cards.findMany as jest.Mock).mockResolvedValue(null);

      await expect(cardsService.getCardsByUserId(userId)).rejects.toThrow(
        'No cards found'
      );
    });
  });

  describe('getCardById', () => {
    it('should return a card by id', async () => {
      (prisma.cards.findUnique as jest.Mock).mockResolvedValue(mockCard);

      const result = await cardsService.getCardById(userId, cardId);

      expect(prisma.cards.findUnique).toHaveBeenCalledWith({
        where: {
          id: cardId,
          user_id: userId,
        },
      });
      expect(result).toEqual(mockCard);
    });

    it('should throw an error when card is not found', async () => {
      (prisma.cards.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(cardsService.getCardById(userId, cardId)).rejects.toThrow(
        'Card not found'
      );
    });
  });

  describe('getCardsForReview', () => {
    it('should return cards due for review', async () => {
      const mockCards: Card[] = [mockCard];
      (prisma.cards.findMany as jest.Mock).mockResolvedValue(mockCards);

      const result = await cardsService.getCardsForReview(userId);

      expect(prisma.cards.findMany).toHaveBeenCalledWith({
        where: {
          user_id: userId,
          OR: [
            { due_date: { lte: expect.any(Date) } },
            { due_date: null },
          ],
        },
        orderBy: {
          due_date: 'asc',
        },
      });
      expect(result).toEqual(mockCards);
    });

    it('should throw an error when no cards are found', async () => {
      (prisma.cards.findMany as jest.Mock).mockResolvedValue([]);

      await expect(cardsService.getCardsForReview(userId)).rejects.toThrow(
        'No cards found'
      );
    });
  });

  describe('processCardReview', () => {
    it('should process a card review successfully', async () => {
      const updatedCard = {
        ...mockCard,
        interval: 6,
        repetitions: 1,
        ease_factor: 2.5 as unknown as Decimal,
        due_date: new Date(),
      };

      (prisma.cards.findUnique as jest.Mock).mockResolvedValue(mockCard);
      (prisma.cards.update as jest.Mock).mockResolvedValue(updatedCard);
      (prisma.review_history.create as jest.Mock).mockResolvedValue({});

      const result = await cardsService.processCardReview(userId, cardId, mockReviewRating);

      expect(prisma.cards.findUnique).toHaveBeenCalledWith({
        where: {
          id: cardId,
          user_id: userId,
        },
      });
      expect(result).toEqual(updatedCard);
    });

    it('should throw an error when card is not found', async () => {
      (prisma.cards.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        cardsService.processCardReview(userId, cardId, mockReviewRating)
      ).rejects.toThrow('Card not found');
    });
  });

  describe('createCard', () => {
    it('should create a new card', async () => {
      const cardData = {
        user_id: 1,
        note_id: 1,
        title: 'Test Card',
        description: 'Test Card Description',
        interval: 1,
        repetitions: 0,
        ease_factor: 2.5 as unknown as Decimal as unknown as Decimal,
        due_date: new Date(),
      };

      (prisma.cards.create as jest.Mock).mockResolvedValue({
        id: cardId,
        ...cardData,
      });

      const result = await cardsService.createCard(userId, cardData);

      expect(prisma.cards.create).toHaveBeenCalledWith({
        data: {
          ...cardData,
          user_id: userId,
        },
      });
      expect(result).toEqual({
        id: cardId,
        ...cardData,
      });
    });
  });

  describe('updateCard', () => {
    it('should update an existing card', async () => {
      const updateData = {
        id: cardId,
        title: 'Updated Card Title',
        description: 'Updated Card Description',
      };

      const updatedCard: Card = {
        ...mockCard,
        ...updateData,
      };

      (prisma.cards.update as jest.Mock).mockResolvedValue(updatedCard);

      const result = await cardsService.updateCard(userId, cardId, updateData);

      expect(prisma.cards.update).toHaveBeenCalledWith({
        where: {
          id: cardId,
          user_id: userId,
        },
        data: updateData,
      });
      expect(result).toEqual(updatedCard);
    });
  });

  describe('deleteCard', () => {
    it('should delete a card', async () => {
      (prisma.cards.delete as jest.Mock).mockResolvedValue(mockCard);

      const result = await cardsService.deleteCard(userId, cardId);

      expect(prisma.cards.delete).toHaveBeenCalledWith({
        where: {
          id: cardId,
          user_id: userId,
        },
      });
      expect(result).toEqual(mockCard);
    });
  });

  describe('getReviewedCard', () => {
    it('should return a reviewed card with updated values for successful review', () => {
      const card = {
        ...mockCard,
        interval: 1,
        repetitions: 0,
        ease_factor: 2.5 as unknown as Decimal,
      };

      const result = (cardsService as any).getReviewedCard(card, 4);

      expect(result.interval).toBe(1); // First review
      expect(result.repetitions).toBe(1);
      expect(Number(result.ease_factor)).toBeCloseTo(2.5 + (0.1 - (5 - 4) * (0.08 + (5 - 4) * 0.02)));
    });

    it('should reset repetitions and interval for failed review', () => {
      const card = {
        ...mockCard,
        interval: 10,
        repetitions: 5,
        ease_factor: 2.5 as unknown as Decimal,
      };

      const result = (cardsService as any).getReviewedCard(card, 2);

      expect(result.interval).toBe(1);
      expect(result.repetitions).toBe(0);
      expect(Number(result.ease_factor)).toBe(2.5 as unknown as Decimal); // Should remain unchanged
    });
  });

  describe('calculateNextReviewDate', () => {
    it('should calculate the next review date correctly', () => {
      const card = {
        ...mockCard,
        interval: 3,
      };

      const result = (cardsService as any).calculateNextReviewDate(card);
      const expectedDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

      // Allow for small time differences in test execution
      expect(result.due_date.getTime()).toBeCloseTo(expectedDate.getTime(), -3);
    });
  });
});
