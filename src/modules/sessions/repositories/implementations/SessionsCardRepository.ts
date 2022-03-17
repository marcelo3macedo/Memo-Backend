import { getRepository, Repository } from 'typeorm';

import SessionCard from '@modules/sessions/entities/SessionCard';
import IUpdateSessionsCardsDTO from '@modules/sessions/dtos/IUpdateSessionsCardsDTO';
import { ISessionsCardRepository } from '../ISessionsCardRepository';
import { CACHE_SESSIONS } from '@constants/cacheKeys';

export class SessionsCardRepository implements ISessionsCardRepository {
  private repository: Repository<SessionCard>;
  private cache: any;

  constructor() {
    this.repository = getRepository(SessionCard);
    this.cache = this.repository.manager.connection.queryResultCache;
  }

  async update({ sessionId, cardId, userId, difficultyId }: IUpdateSessionsCardsDTO): Promise<void> {
    await this.repository.update({ sessionsId: sessionId, cardsId: cardId }, { difficultyId });
    this.cache.remove([ `${CACHE_SESSIONS}:${userId}` ])
  }
}