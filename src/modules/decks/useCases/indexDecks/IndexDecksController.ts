import logger from '@config/logger';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IndexDecksUseCase } from './IndexDecksUseCase';

export class IndexDecksController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { deckId, path } = request.params;
      const { id: userId } = request['user'] || {};

      const indexDecksUseCase = container.resolve(IndexDecksUseCase);
      const deck = await indexDecksUseCase.execute({ 
        deckId, 
        userId,
        path
      });

      return response.json(deck);
    } catch (error) {
      logger.error(`[IndexDecksController] ${error.message}`);
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}