import logger from '@config/logger';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateSessionsUseCase } from './UpdateSessionsUseCase';

export class UpdateSessionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: userId } = request["user"] || {};
      const { sessionId } = request.params || {};
      const { cards } = request.body || {};
      
      const updateSessionsUseCase = container.resolve(UpdateSessionsUseCase);
      const sessions = await updateSessionsUseCase.execute({ userId, sessionId, cards });

      return response.json(sessions);
    } catch (error) {
      logger.error(`[UpdateSessionsController] ${error.message}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}