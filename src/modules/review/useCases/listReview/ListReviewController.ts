import logger from '@config/logger';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListReviewUseCase } from './ListReviewUseCase';

export class ListReviewController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const listReviewUseCase = container.resolve(ListReviewUseCase);
      const review = await listReviewUseCase.execute({ userId });

      return response.json(review);
    } catch (error) {
      logger.error(`[ListReviewController] ${error.message}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}