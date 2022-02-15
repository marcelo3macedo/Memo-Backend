import logger from '@config/logger';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemoveDifficultiesUseCase } from './RemoveDifficultiesUseCase';

export class RemoveDifficultiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { difficultyId } = request.params;

      const removeDifficultiesUseCase = container.resolve(RemoveDifficultiesUseCase);
      await removeDifficultiesUseCase.execute({ difficultyId });

      return response.status(200).json();
    } catch (error) {
      logger.error(`[RemoveDifficultiesController] ${error.message}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}