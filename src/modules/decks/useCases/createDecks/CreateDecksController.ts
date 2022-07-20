import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDecksUseCase } from './CreateDecksUseCase';
import { IndexDecksUseCase } from '../indexDecks/IndexDecksUseCase';
import logger from '@config/logger';

export class CreateDecksController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description, isPublic, clonedBy, frequencyId, categoryId } = request.body;
      const userId = request['user'].id;
        
      const createDecksUseCase = container.resolve(CreateDecksUseCase);
      const deck = await createDecksUseCase.execute({ name, description, userId, frequencyId, isPublic, clonedBy, categoryId });

      return response.status(201).json(deck);
    } catch (error) {
      logger.error(`[CreateDecksController] ${error.message}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}