import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDecksUseCase } from './CreateDecksUseCase';
import { IndexDecksUseCase } from '../indexDecks/IndexDecksUseCase';
import logger from '@config/logger';

export class CreateDecksController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description, parentId, isPublic, clonedBy, frequencyId, categoryId, themeId } = request.body;
      const userId = request['user'].id;
        
      if (parentId) {
        const indexDecksUseCase = container.resolve(IndexDecksUseCase);
        await indexDecksUseCase.execute({ userId, deckId:parentId, isPublic });
      }

      const createDecksUseCase = container.resolve(CreateDecksUseCase);
      const deck = await createDecksUseCase.execute({ name, description, parentId, userId, frequencyId, isPublic, clonedBy, categoryId, themeId });

      return response.status(201).json(deck);
    } catch (error) {
      logger.error(`[CreateDecksController] ${error.message}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}