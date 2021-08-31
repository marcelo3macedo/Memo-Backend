import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemoveCardsUseCase } from './RemoveCardsUseCase';

export class RemoveCardsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { cardId } = request.params;
      
      const removeCardsUseCase = container.resolve(RemoveCardsUseCase);
      await removeCardsUseCase.execute({ cardId });

      return response.status(200).send();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}