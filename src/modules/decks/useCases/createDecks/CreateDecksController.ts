import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDecksUseCase } from './CreateDecksUseCase';
import { IndexDecksUseCase } from '../indexDecks/IndexDecksUseCase';

export class CreateDecksController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, parentId, isPublic } = request.body;
      const userId = request['user'].id;
        
      if (parentId) {
        const indexDecksUseCase = container.resolve(IndexDecksUseCase);
        await indexDecksUseCase.execute({ userId, deckId:parentId, isPublic });
      }

      const createDecksUseCase = container.resolve(CreateDecksUseCase);
      const deck = await createDecksUseCase.execute({ name, parentId, userId, isPublic });

      return response.status(201).json(deck);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}