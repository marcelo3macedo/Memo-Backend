import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IndexCategoriesUseCase } from './IndexCategoriesUseCase';

export class IndexCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { categoryId } = request.params;

      const indexCategoriesUseCase = container.resolve(IndexCategoriesUseCase);
      const category = await indexCategoriesUseCase.execute({ categoryId });

      return response.json(category);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}