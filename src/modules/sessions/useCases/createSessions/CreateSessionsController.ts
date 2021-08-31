import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSessionsUseCase } from './CreateSessionsUseCase';
import { IndexDecksUseCase } from '@modules/decks/useCases/indexDecks/IndexDecksUseCase';

export class CreateSessionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const { deckId } = request.params;
      const { cards  } = request.body;

      const indexDecksUseCase = container.resolve(IndexDecksUseCase);
      const deck = await indexDecksUseCase.execute({ deckId, userId });

      const createSessionsUseCase = container.resolve(CreateSessionsUseCase);
      await createSessionsUseCase.execute({ userId, deck, cards });

      return response.status(201).send();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}