import logger from '@config/logger';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSearchUseCase } from './ListSearchUseCase';

export class ListSearchController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { query } = request.params;
      const { page } = request.query;

      const listSearchUseCase = container.resolve(ListSearchUseCase);
      const search = await listSearchUseCase.execute({ query, page });

      return response.json(search);
    } catch (error) {
      logger.error(`[ListSearchController] ${error.message}`);
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}