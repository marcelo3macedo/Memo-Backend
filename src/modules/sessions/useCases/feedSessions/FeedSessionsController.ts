import logger from '@config/logger';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FeedSessionsUseCase } from './FeedSessionsUseCase';

export class FeedSessionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: userId } = request["user"] || {};
      const { deckId } = request.params || {};
      
      const feedSessionsUseCase = container.resolve(FeedSessionsUseCase);
      const sessions = await feedSessionsUseCase.execute({ userId, deckId });

      return response.json(sessions);
    } catch (error) {
      logger.error(`[FeedSessionsController] ${error.message}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}