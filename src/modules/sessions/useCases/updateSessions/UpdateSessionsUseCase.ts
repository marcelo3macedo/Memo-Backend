import { inject, injectable } from 'tsyringe';

import { CARD_NOTFOUND, SESSION_NOTFOUND } from '@constants/logger';
import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import IUpdateSessionsDTO from '@modules/sessions/dtos/IUpdateSessionsDTO';
import { ISessionsCardRepository } from '@modules/sessions/repositories/ISessionsCardRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class UpdateSessionsUseCase {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('SessionsCardRepository')
    private sessionsCardRepository: ISessionsCardRepository,
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository
  ) {}

  async execute({ userId, sessionId, cards }:IUpdateSessionsDTO): Promise<void> {
    const session = await this.sessionsRepository.index({ userId, sessionId });
    
    if (!session) {
      throw new AppError(SESSION_NOTFOUND);
    }

    cards.map(async c => {
      let card = await this.cardsRepository.index({ cardId: c.id });

      if (!card) {
        throw new AppError(CARD_NOTFOUND);
      }

      await this.sessionsCardRepository.update({ sessionId: session.id, cardId: c.id, difficultyId: c.difficultyId, userId });
    });

    await this.sessionsRepository.remove({ sessionId, userId });
  }
}