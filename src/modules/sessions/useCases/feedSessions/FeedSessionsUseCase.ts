import { inject, injectable } from 'tsyringe';

import Session from '@modules/sessions/entities/Session';
import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import IFeedSessionsDTO from '@modules/sessions/dtos/IFeedSessionsDTO';
import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import { AppError } from '@shared/errors/AppError';
import { CARD_NOTFOUND, DECK_NOTFOUND, SESSION_ALREADY_EXISTS } from '@constants/logger';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import limit from '@config/limit';

@injectable()
export class FeedSessionsUseCase {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('DecksRepository')
    private decksRepository: IDecksRepository,
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository
  ) {}

  async execute({ userId, deckId }:IFeedSessionsDTO): Promise<Session> {
    const deck = await this.decksRepository.index({ deckId });
    
    if (!deck) {
      throw new AppError(DECK_NOTFOUND);
    }

    const cards = await this.cardsRepository.filter({ deck, limit: limit.session });
    if (!cards || cards.length === 0) {
      throw new AppError(CARD_NOTFOUND);
    }

    const exists = await this.sessionsRepository.exists({ deckId: deck.id, userId });    
    if (exists) {
      return await this.sessionsRepository.index({ userId, sessionId: exists.id });
    }

    return await this.sessionsRepository.create({ userId, deck, cards });    
  }
}