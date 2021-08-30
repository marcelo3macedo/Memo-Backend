import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListDecksUseCase } from './ListDecksUseCase';

export class ListDecksController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const listDecksUseCase = container.resolve(ListDecksUseCase);
      const decks = await listDecksUseCase.execute({ userId });

      return response.json(decks);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}