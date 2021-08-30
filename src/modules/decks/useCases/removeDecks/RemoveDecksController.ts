import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemoveDecksUseCase } from './RemoveDecksUseCase';

export class RemoveDecksController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { deckId } = request.params;
      const userId = request['user'].id;
      
      const removeDecksUseCase = container.resolve(RemoveDecksUseCase);
      const deck = await removeDecksUseCase.execute({ deckId, userId });

      return response.json(deck);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}