import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCardsUseCase } from './CreateCardsUseCase';
import { IndexDecksUseCase } from '@modules/decks/useCases/indexDecks/IndexDecksUseCase';

export class CreateCardsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { deckId } = request.params;
      const { title, content, secretContent } = request.body;
      const userId = request['user'].id;

      const indexDecksUseCase = container.resolve(IndexDecksUseCase);
      const deck = await indexDecksUseCase.execute({ deckId, userId });
      
      const createCardsUseCase = container.resolve(CreateCardsUseCase);
      await createCardsUseCase.execute({ deck, title, content, secretContent });

      return response.status(201).send();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}