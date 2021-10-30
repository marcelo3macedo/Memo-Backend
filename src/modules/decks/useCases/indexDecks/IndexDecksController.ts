import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IndexDecksUseCase } from './IndexDecksUseCase';

export class IndexDecksController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { deckId } = request.params;
      const { isPublic } = request.query;
      const userId = request['user'].id;

      const indexDecksUseCase = container.resolve(IndexDecksUseCase);
      const deck = await indexDecksUseCase.execute({ 
        deckId, 
        userId,
        isPublic: !!isPublic 
      });

      return response.json(deck);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}