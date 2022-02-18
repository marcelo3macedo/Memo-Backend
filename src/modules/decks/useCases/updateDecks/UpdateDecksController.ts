import logger from '@config/logger';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateDecksUseCase } from './UpdateDecksUseCase';

export class UpdateDecksController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { deckId } = request.params;
      const { name, description, frequencyId } = request.body;
      
      const updateDecksUseCase = container.resolve(UpdateDecksUseCase);
      const deck = await updateDecksUseCase.execute({ deckId, name, description, frequencyId });

      return response.json(deck);
    } catch (error) {
      logger.error(`[UpdateDecksController] ${error.message}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}