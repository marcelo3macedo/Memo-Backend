import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateSessionsUseCase } from './UpdateSessionsUseCase';
import { IndexSessionsUseCase } from '@modules/sessions/useCases/indexSessions/IndexSessionsUseCase';
import logger from '@config/logger';

export class UpdateSessionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const { sessionId } = request.params;
      const { finished_at } = request.body;
      
      const indexSessionsUseCase = container.resolve(IndexSessionsUseCase);
      const session = await indexSessionsUseCase.execute({ userId, sessionId });
      
      const updateSessionsUseCase = container.resolve(UpdateSessionsUseCase);
      await updateSessionsUseCase.execute({ session, finished_at });

      return response.status(204).send();
    } catch (error) {
      logger.error(`[UpdateSessionsController] ${error.message}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}