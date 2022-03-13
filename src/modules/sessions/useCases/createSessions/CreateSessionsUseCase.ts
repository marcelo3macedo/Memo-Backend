import { inject, injectable } from 'tsyringe';

import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import ICreateSessionsDTO from "@modules/sessions/dtos/ICreateSessionsDTO";
import Session from '@modules/sessions/entities/Session';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import { AppError } from '@shared/errors/AppError';
import { CARDS_NOTFOUND, DECK_NOTFOUND, NOT_ALLOWED, SESSION_ALREADY_EXISTS } from '@constants/logger';

@injectable()
export class CreateSessionsUseCase {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('DecksRepository')
    private decksRepository: IDecksRepository,
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository    
  ) {}

  async execute({ userId, deckId, cards }:ICreateSessionsDTO): Promise<Session> {
    const deck = await this.decksRepository.index({ deckId });

    if (!deck) {
      throw new AppError(DECK_NOTFOUND);
    }

    if (deck.userId !== userId) {
      throw new AppError(NOT_ALLOWED);
    }

    const hasSession = await this.sessionsRepository.exists({ deckId, userId });
    if (hasSession) {
      throw new AppError(SESSION_ALREADY_EXISTS);
    }

    if (!cards || !Array.isArray(cards) || cards.length == 0) {
      throw new AppError(CARDS_NOTFOUND);
    }

    const cardsFound = await Promise.all(cards.map(async c => {
      return await this.cardsRepository.index({ cardId: c.id });
    }));
    
    return await this.sessionsRepository.create({ userId, deck, cards: cardsFound });
  }
}