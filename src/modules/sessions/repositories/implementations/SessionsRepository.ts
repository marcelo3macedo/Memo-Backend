import { getRepository, Repository } from 'typeorm';

import { AppError } from "@shared/errors/AppError";
import Session from '../../entities/Session';
import { ISessionsRepository } from '../ISessionsRepository';
import { SESSION_NOTFOUND } from '@constants/logger';
import { CACHE_SESSIONS } from '@constants/cacheKeys';

export class SessionsRepository implements ISessionsRepository {
  private repository: Repository<Session>;
  private cache: any;

  constructor() {
    this.repository = getRepository(Session);
    this.cache = this.repository.manager.connection.queryResultCache;
  }

  async create({ userId, deck, cards }): Promise<Session> {
    const session = this.repository.create({
      userId,
      deck,
      cards
    });

    await this.repository.save(session);
    this.cache.remove([ `${CACHE_SESSIONS}:${userId}` ])

    return session;
  }

  async exists({ userId, deckId }): Promise<Session> {
    return this.repository.findOne({ where: { deckId, userId } });
  }

  async index({ userId, sessionId }): Promise<Session> {
    return this.repository.createQueryBuilder('sessions')
      .leftJoinAndSelect('sessions.deck', 'deck')
      .leftJoinAndSelect('sessions.cards', 'cards')
      .where({ id:sessionId, userId })
      .cache(`${CACHE_SESSIONS}:${userId}`)
      .getOne();
  }

  async remove({ userId, sessionId }): Promise<void> {
    await this.repository.softDelete({ id: sessionId, userId });
    this.cache.remove([ `${CACHE_SESSIONS}:${userId}` ])
  }
  
  async list({ userId }): Promise<Session[]> {
    return this.repository.createQueryBuilder('sessions')
      .leftJoinAndSelect('sessions.deck', 'deck')
      .leftJoinAndSelect('deck.frequency', 'frequency')
      .leftJoinAndSelect("deck.theme", "theme")
      .loadRelationCountAndMap('sessions.sessionCards', 'sessions.cards', 'cards')
      .loadRelationCountAndMap('deck.cardsCount', 'deck.cards', 'cards')
      .where('sessions.userId = :userId')
      .setParameter('userId', userId)
      .orderBy('sessions.createdAt', 'DESC')
      .cache(`${CACHE_SESSIONS}:${userId}`)
      .getMany();
  }

  async history({ userId }): Promise<Session[]> {
    return this.repository.createQueryBuilder('sessions')
      .leftJoinAndSelect('sessions.deck', 'deck')
      .loadRelationCountAndMap('sessions.sessionCards', 'sessions.cards', 'cards')
      .loadRelationCountAndMap('deck.cardsCount', 'deck.cards', 'cards')
      .where('sessions.userId = :userId')
      .setParameter('userId', userId)
      .withDeleted() 
      .orderBy('sessions.createdAt', 'DESC')
      .cache(`${CACHE_SESSIONS}:${userId}`)
      .getMany();
  }

  async last({ userId }): Promise<Session> {
    return this.repository.createQueryBuilder('sessions')
      .leftJoinAndSelect('sessions.deck', 'deck')
      .loadRelationCountAndMap('sessions.sessionCards', 'sessions.cards', 'cards')
      .loadRelationCountAndMap('deck.cardsCount', 'deck.cards', 'cards')
      .where('sessions.userId = :userId')
      .setParameter('userId', userId)
      .orderBy("sessions.createdAt", "DESC")
      .cache(`${CACHE_SESSIONS}:${userId}`)
      .getOne();
  }

  

  async indexByDeck({ userId, deck }): Promise<Session> {
    return await this.repository.findOne({ where: { deck, userId: userId }, relations: [ 'cards', 'deck' ] });
  }

  

  

  async filter({ olderThen, deckId }):Promise<Session[]> {
    let queryBuilder = this.repository.createQueryBuilder("sessions")
      .leftJoinAndSelect("sessions.deck", "deck")
      .leftJoinAndSelect("sessions.cards", "cards");
      
    if (olderThen) {
      queryBuilder.andWhere("sessions.createdAt > :createdAt", { createdAt: olderThen });
    }

    if (deckId) {
      queryBuilder.andWhere("sessions.deckId = :deckId", { deckId });
    }

    return queryBuilder.getMany();
  }
}