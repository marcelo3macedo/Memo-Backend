import logger from '@config/logger';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCardsUseCase } from './ListCardsUseCase';

export class ListCardsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { deckId } = request.params;
      
      const listCardsUseCase = container.resolve(ListCardsUseCase);
      const cards = await listCardsUseCase.execute({ deckId });

      return response.json(cards);
    } catch (error) {
      logger.error(`[ListCardsController] ${error}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}