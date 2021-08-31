import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IndexSessionsCardsUseCase } from './IndexSessionsCardsUseCase';
import { IndexSessionsUseCase } from '@modules/sessions/useCases/indexSessions/IndexSessionsUseCase';

export class IndexSessionsCardsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const { sessionId } = request.params;
      const { cardId } = request.body;

      const indexSessionsUseCase = container.resolve(IndexSessionsUseCase);
      const session = await indexSessionsUseCase.execute({ userId, sessionId });

      const indexSessionsCardsUseCase = container.resolve(IndexSessionsCardsUseCase);
      await indexSessionsCardsUseCase.execute({ sessionId: session.id, cardId });

      return response.status(204).send();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}