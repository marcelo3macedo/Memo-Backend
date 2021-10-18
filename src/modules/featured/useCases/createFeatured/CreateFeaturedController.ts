import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateFeaturedUseCase } from './CreateFeaturedUseCase';
import { IndexDecksUseCase } from '@modules/decks/useCases/indexDecks/IndexDecksUseCase';

export class CreateFeaturedController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const { deckId } = request.body;
      const isPublic = true;
      
      const indexDecksUseCase = container.resolve(IndexDecksUseCase);
      const deck = await indexDecksUseCase.execute({ deckId, isPublic });

      const createFeaturedUseCase = container.resolve(CreateFeaturedUseCase);
      await createFeaturedUseCase.execute({ deck });

      return response.status(201).send();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}