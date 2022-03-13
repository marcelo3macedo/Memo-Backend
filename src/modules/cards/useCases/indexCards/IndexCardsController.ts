import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IndexCardsUseCase } from './IndexCardsUseCase';
import logger from '@config/logger';


export class IndexCardsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { cardId } = request.params;
      
      const indexCardsUseCase = container.resolve(IndexCardsUseCase);
      const card = await indexCardsUseCase.execute({ cardId });

      return response.json(card);
    } catch (error) {
      logger.error(`[IndexCardsController] ${error.message}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}