import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSessionsUseCase } from './CreateSessionsUseCase';
import logger from '@config/logger';

export class CreateSessionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const { deckId } = request.params;
      const { cards  } = request.body;

      const createSessionsUseCase = container.resolve(CreateSessionsUseCase);
      const session = await createSessionsUseCase.execute({ userId, deckId, cards });

      return response.status(201).send(session);
    } catch (error) {
      logger.error(`[CreateSessionsController] ${error.message}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}