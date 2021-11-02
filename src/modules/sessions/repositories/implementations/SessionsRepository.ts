import { getRepository, MoreThan, Repository } from 'typeorm';

import { AppError } from "@shared/errors/AppError";
import Session from '../../entities/Session';
import { ISessionsRepository } from '../ISessionsRepository';

export class SessionsRepository implements ISessionsRepository {
  private repository: Repository<Session>;

  constructor() {
    this.repository = getRepository(Session);
  }

  async list({ userId }): Promise<Session[]> {
    return this.repository.createQueryBuilder('sessions')
      .leftJoinAndSelect('sessions.deck', 'deck')
      .loadRelationCountAndMap('sessions.sessionCards', 'sessions.cards', 'cards')
      .loadRelationCountAndMap('deck.cardsCount', 'deck.cards', 'cards')
      .where('sessions.userId = :userId')
      .setParameter('userId', userId)
      .getMany();
  }

  async history({ userId }): Promise<Session[]> {
    return this.repository.createQueryBuilder('sessions')
      .leftJoinAndSelect('sessions.deck', 'deck')
      .loadRelationCountAndMap('sessions.sessionCards', 'sessions.cards', 'cards')
      .loadRelationCountAndMap('deck.cardsCount', 'deck.cards', 'cards')
      .where('sessions.userId = :userId')
      .andWhere('sessions.finishedAt IS NOT NULL')
      .setParameter('userId', userId)
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
      .getOne();
  }

  async index({ userId, sessionId }): Promise<Session> {
    const session = await this.repository.findOne({ where: { id:sessionId, userId: userId }, relations: [ 'cards', 'deck' ] });
    
    if (!session) {
      throw new AppError("Session not found", 400);      
    }   

    return session;
  }

  async indexByDeck({ userId, deck }): Promise<Session> {
    return await this.repository.findOne({ where: { deck, userId: userId }, relations: [ 'cards', 'deck' ] });
  }

  async create({ userId, deck, cards }): Promise<Session> {
    if (!deck) {
      throw new AppError("Deck not found", 400);      
    }   

    const session = this.repository.create({
      userId,
      deck,
      cards
    });

    await this.repository.save(session);

    return session;
  }

  async update({ session, finished_at }): Promise<void> {
    if (!finished_at) {
      return;
    }
    
    await this.repository.softDelete(session.id);
  }

  async remove({ userId, sessionId }): Promise<void> {
    await this.repository.softDelete({ id: sessionId, userId });
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