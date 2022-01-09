import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CloneDecksUseCase } from './CloneDecksUseCase';
import { IndexDecksUseCase } from '../indexDecks/IndexDecksUseCase';

export class CloneDecksController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const { deckId } = request.params;

      const indexDecksUseCase = container.resolve(IndexDecksUseCase);
      const deck = await indexDecksUseCase.execute({ deckId, isPublic: true });

      const cloneDecksUseCase = container.resolve(CloneDecksUseCase);
      const clonedDeck = await cloneDecksUseCase.execute({ deck, userId });

      return response.status(201).json(clonedDeck);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}