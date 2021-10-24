import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListHistorySessionsUseCase } from './ListHistorySessionsUseCase';

export class ListHistorySessionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const listHistorySessionsUseCase = container.resolve(ListHistorySessionsUseCase);
      const sessions = await listHistorySessionsUseCase.execute({ userId });

      return response.json(sessions);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}