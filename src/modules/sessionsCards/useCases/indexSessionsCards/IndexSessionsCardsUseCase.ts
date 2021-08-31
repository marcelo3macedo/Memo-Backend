import { inject, injectable } from 'tsyringe';

import { ISessionsCardsRepository } from '@modules/sessionsCards/repositories/ISessionsCardsRepository';
import IIndexSessionsCardsDTO from '@modules/sessionsCards/dtos/IIndexSessionsCardsDTO';
import SessionCard from '@modules/sessionsCards/entities/SessionCard';

@injectable()
export class IndexSessionsCardsUseCase {
  constructor(
    @inject('SessionsCardsRepository')
    private sessionsCardsRepository: ISessionsCardsRepository
  ) {}

  async execute({ sessionId, cardId }:IIndexSessionsCardsDTO): Promise<SessionCard> {
    return this.sessionsCardsRepository.index({ sessionId, cardId });
  }
}