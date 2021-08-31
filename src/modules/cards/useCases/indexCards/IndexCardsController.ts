import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IndexCardsUseCase } from './IndexCardsUseCase';
import { IndexDecksUseCase } from '@modules/decks/useCases/indexDecks/IndexDecksUseCase';


export class IndexCardsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { deckId, cardId } = request.params;
      const userId = request['user'].id;
      
      const indexDecksUseCase = container.resolve(IndexDecksUseCase);
      const deck = await indexDecksUseCase.execute({ deckId, userId });

      const indexCardsUseCase = container.resolve(IndexCardsUseCase);
      const card = await indexCardsUseCase.execute({ deck, cardId });

      return response.json(card);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}