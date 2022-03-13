import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateFeaturedUseCase } from './CreateFeaturedUseCase';
import logger from '@config/logger';

export class CreateFeaturedController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const { deckId } = request.body;
      
      const createFeaturedUseCase = container.resolve(CreateFeaturedUseCase);
      await createFeaturedUseCase.execute({ deckId });

      return response.status(201).send();
    } catch (error) {
      logger.error(`[CreateFeaturedController] ${error.message}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}