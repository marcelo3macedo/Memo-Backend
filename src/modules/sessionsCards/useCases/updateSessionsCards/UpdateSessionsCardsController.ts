import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateSessionsCardsUseCase } from './UpdateSessionsCardsUseCase';
import { IndexSessionsUseCase } from '@modules/sessions/useCases/indexSessions/IndexSessionsUseCase';
import { UpdateSessionsUseCase } from '@modules/sessions/useCases/updateSessions/UpdateSessionsUseCase';
import { IndexCardsUseCase } from '@modules/cards/useCases/indexCards/IndexCardsUseCase';
import { IndexSessionsCardsUseCase } from '../indexSessionsCards/IndexSessionsCardsUseCase';

export class UpdateSessionsCardsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const { sessionId } = request.params;
      const { cards } = request.body;

      const indexSessionsUseCase = container.resolve(IndexSessionsUseCase);
      const session = await indexSessionsUseCase.execute({ userId, sessionId });
      
      const indexCardsUseCase = container.resolve(IndexCardsUseCase);
      const indexSessionsCardsUseCase = container.resolve(IndexSessionsCardsUseCase);
      const updateSessionsCardsUseCase = container.resolve(UpdateSessionsCardsUseCase);
      const updateSessionsUseCase = container.resolve(UpdateSessionsUseCase);      

      cards.map(async(c) => {
        let card = await indexCardsUseCase.execute({ cardId: c.id, deck: session.deck });
        
        if (!card) {
          return;
        }

        let sessionCard = await indexSessionsCardsUseCase.execute({ sessionId: session.id, cardId: card.id });
        
        if (!sessionCard) {
          return;
        }

        sessionCard.difficultyId = c.difficultyId ? c.difficultyId : null;
        sessionCard.answeredAt = c.answeredAt ? new Date(c.answeredAt) : null;
        
        await updateSessionsCardsUseCase.execute({ sessionCard });
      });     
      
      const finished_at = new Date().toString();
      await updateSessionsUseCase.execute({ session, finished_at })

      return response.status(204).send();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}