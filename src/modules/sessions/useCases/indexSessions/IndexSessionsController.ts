import logger from '@config/logger';
import { ListDifficultiesUseCase } from '@modules/difficulties/useCases/listDifficulties/ListDifficultiesUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IndexSessionsUseCase } from './IndexSessionsUseCase';

export class IndexSessionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const { sessionId } = request.params;

      const indexSessionsUseCase = container.resolve(IndexSessionsUseCase);
      const sessions = await indexSessionsUseCase.execute({ userId, sessionId });
      
      const listDifficultiesUseCase = container.resolve(ListDifficultiesUseCase);
      const difficulties = await listDifficultiesUseCase.execute();

      if (difficulties) {
        sessions["difficulties"] = difficulties;
      }

      return response.json(sessions);
    } catch (error) {
      logger.error(`[IndexSessionsController] ${error.message}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}