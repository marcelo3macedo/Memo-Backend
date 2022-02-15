import logger from '@config/logger';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateCardsUseCase } from './UpdateCardsUseCase';

export class UpdateCardsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { cardId } = request.params;
      const { title, content, secretContent } = request.body;
      
      const updateCardsUseCase = container.resolve(UpdateCardsUseCase);
      await updateCardsUseCase.execute({ cardId, title, content, secretContent });

      return response.status(200).send();
    } catch (error) {
      logger.error(`[UpdateCardsController] ${error}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}