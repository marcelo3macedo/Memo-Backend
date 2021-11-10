import { inject, injectable } from 'tsyringe';

import IUpdateSessionsCardsDTO from '@modules/sessionsCards/dtos/IUpdateSessionsCardsDTO';
import { ISessionsCardsRepository } from '@modules/sessionsCards/repositories/ISessionsCardsRepository';

@injectable()
export class UpdateSessionsCardsUseCase {
  constructor(
    @inject('SessionsCardsRepository')
    private sessionsCardsRepository: ISessionsCardsRepository
  ) {}

  async execute({ sessionId, cards }:IUpdateSessionsCardsDTO): Promise<void> {
    cards.map(async(c) => {
      let sessionCard = await this.sessionsCardsRepository.index({ cardId: c.id, sessionId });

      if (!sessionCard) {
        return;
      }

      sessionCard.difficultyId = c.difficultyId ? c.difficultyId : null;
      
      await this.sessionsCardsRepository.update({ sessionCard });
    });
  }
}