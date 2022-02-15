import logger from '@config/logger';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RemoveSessionsUseCase } from './RemoveSessionsUseCase';

export class RemoveSessionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const { sessionId } = request.params;

      const removeSessionsUseCase = container.resolve(RemoveSessionsUseCase);
      await removeSessionsUseCase.execute({ userId, sessionId });

      return response.status(200).send();
    } catch (error) {
      logger.error(`[RemoveSessionsController] ${error.message}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}