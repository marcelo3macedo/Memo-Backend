import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListDifficultiesUseCase } from './ListDifficultiesUseCase';

export class ListDifficultiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listDifficultiesUseCase = container.resolve(ListDifficultiesUseCase);
      const difficulties = await listDifficultiesUseCase.execute();

      return response.json(difficulties);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}