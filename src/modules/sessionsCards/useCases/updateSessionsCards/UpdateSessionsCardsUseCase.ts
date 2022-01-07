import { inject, injectable } from 'tsyringe';

import IUpdateSessionsCardsDTO from '@modules/sessionsCards/dtos/IUpdateSessionsCardsDTO';
import { ISessionsCardsRepository } from '@modules/sessionsCards/repositories/ISessionsCardsRepository';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import { IDifficultiesRepository } from '@modules/difficulties/repositories/IDifficultiesRepository';

@injectable()
export class UpdateSessionsCardsUseCase {
  constructor(
    @inject('SessionsCardsRepository')
    private sessionsCardsRepository: ISessionsCardsRepository,
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,
    @inject('DifficultiesRepository')
    private difficultiesRepository: IDifficultiesRepository
  ) {}

  async execute({ sessionId, cards }:IUpdateSessionsCardsDTO): Promise<void> {
    cards.map(async(c) => {
      let sessionCard = await this.sessionsCardsRepository.index({ cardId: c.id, sessionId });

      if (!sessionCard) {
        return;
      }

      sessionCard.difficultyId = c.difficultyId ? c.difficultyId : null;

      const difficulty = await this.difficultiesRepository.find({ id: sessionCard.difficultyId })
      
      await this.sessionsCardsRepository.update({ sessionCard });
    });
  }
}