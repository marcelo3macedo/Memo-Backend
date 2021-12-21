import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateSessionsCardsUseCase } from './UpdateSessionsCardsUseCase';
import { IndexSessionsUseCase } from '@modules/sessions/useCases/indexSessions/IndexSessionsUseCase';
import { UpdateSessionsUseCase } from '@modules/sessions/useCases/updateSessions/UpdateSessionsUseCase';

export class UpdateSessionsCardsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const { sessionId } = request.params;
      const { cards } = request.body;
      const finished_at = new Date().toString();

      const indexSessionsUseCase = container.resolve(IndexSessionsUseCase);
      const session = await indexSessionsUseCase.execute({ userId, sessionId });

      const updateSessionsCardsUseCase = container.resolve(UpdateSessionsCardsUseCase);
      await updateSessionsCardsUseCase.execute({ sessionId, cards });
      
      const updateSessionsUseCase = container.resolve(UpdateSessionsUseCase);
      await updateSessionsUseCase.execute({ session, finished_at })

      return response.status(204).send();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}