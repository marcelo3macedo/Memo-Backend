import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSearchUseCase } from './ListSearchUseCase';

export class ListSearchController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listSearchUseCase = container.resolve(ListSearchUseCase);
      const search = await listSearchUseCase.execute();

      return response.json(search);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}