import logger from '@config/logger';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSessionsUseCase } from './ListSessionsUseCase';

export class ListSessionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const listSessionsUseCase = container.resolve(ListSessionsUseCase);
      const sessions = await listSessionsUseCase.execute({ userId });

      return response.json(sessions);
    } catch (error) {
      logger.error(`[ListSessionsController] ${error.message}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}