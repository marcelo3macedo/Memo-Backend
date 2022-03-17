import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CloneDecksUseCase } from './CloneDecksUseCase';
import logger from '@config/logger';

export class CloneDecksController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const { deckId } = request.params;

      const cloneDecksUseCase = container.resolve(CloneDecksUseCase);
      const clonedDeck = await cloneDecksUseCase.execute({ deckId, userId });

      return response.status(201).json(clonedDeck);
    } catch (error) {
      logger.error(`[CloneDecksController] ${error.message}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}