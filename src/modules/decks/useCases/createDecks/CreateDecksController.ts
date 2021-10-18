import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateDecksUseCase } from './CreateDecksUseCase';

export class CreateDecksController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.body;
      const userId = request['user'].id;
      
      const createDecksUseCase = container.resolve(CreateDecksUseCase);
      const deck = await createDecksUseCase.execute({ name, userId });

      return response.status(201).json(deck);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}