import logger from '@config/logger';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoriesUseCase } from './CreateCategoriesUseCase';

export class CreateCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name } = request.body;
      
      const createCategoriesUseCase = container.resolve(CreateCategoriesUseCase);
      await createCategoriesUseCase.execute({ name });

      return response.status(201).json();
    } catch (error) {
      logger.error(`[ListCategoriesController] ${error}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}