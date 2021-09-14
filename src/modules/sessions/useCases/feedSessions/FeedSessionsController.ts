import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IndexDecksUseCase } from '@modules/decks/useCases/indexDecks/IndexDecksUseCase';
import { CreateSessionsUseCase } from '@modules/sessions/useCases/createSessions/CreateSessionsUseCase';
import { FeedSessionsUseCase } from './FeedSessionsUseCase';
import { IndexDeckSessionsUseCase } from '../indexDeckSessions/IndexDeckSessionsUseCase';
import { ListDifficultiesUseCase } from '@modules/difficulties/useCases/listDifficulties/ListDifficultiesUseCase';

export class FeedSessionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const { deckId } = request.params;   

      const indexDecksUseCase = container.resolve(IndexDecksUseCase);
      const deck = await indexDecksUseCase.execute({ deckId, userId });

      const indexDeckSessionsUseCase = container.resolve(IndexDeckSessionsUseCase);
      const sessionExists = await indexDeckSessionsUseCase.execute({ deck, userId }); 

      const listDifficultiesUseCase = container.resolve(ListDifficultiesUseCase);
      const difficulties = await listDifficultiesUseCase.execute();

      if (sessionExists) {
        if (difficulties) {
          sessionExists["difficulties"] = difficulties;
        }

        return response.json(sessionExists);
      }

      const feedSessionsUseCase = container.resolve(FeedSessionsUseCase);
      const cards = await feedSessionsUseCase.execute({ deck });

      const createSessionsUseCase = container.resolve(CreateSessionsUseCase);
      const session = await createSessionsUseCase.execute({ userId, deck, cards });

      if (difficulties) {
        session["difficulties"] = difficulties;
      }

      return response.json(session);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}