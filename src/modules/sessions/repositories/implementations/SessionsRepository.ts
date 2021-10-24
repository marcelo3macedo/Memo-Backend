import { getRepository, MoreThan, Repository } from 'typeorm';

import Session from '../../entities/Session';
import { ISessionsRepository } from '../ISessionsRepository';
import IListSessionsDTO from "@modules/sessions/dtos/IListSessionsDTO";
import ICreateSessionsDTO from "@modules/sessions/dtos/ICreateSessionsDTO";
import IUpdateSessionsDTO from "@modules/sessions/dtos/IUpdateSessionsDTO";
import IRemoveSessionsDTO from "@modules/sessions/dtos/IRemoveSessionsDTO";
import { AppError } from "@shared/errors/AppError";
import IIndexSessionsDTO from '@modules/sessions/dtos/IIndexSessionsDTO';
import IFilterSessionsDTO from '@modules/sessions/dtos/IFilterSessionsDTO';
import IIndexSessionsDeckDTO from '@modules/sessions/dtos/IIndexSessionsDeckDTO';
import IListHistorySessionsDTO from '@modules/sessions/dtos/IListHistorySessionsDTO';

export class SessionsRepository implements ISessionsRepository {
  private repository: Repository<Session>;

  constructor() {
    this.repository = getRepository(Session);
  }

  async list({ userId }: IListSessionsDTO): Promise<Session[]> {
    return this.repository.createQueryBuilder('sessions')
      .leftJoinAndSelect('sessions.deck', 'deck')
      .loadRelationCountAndMap('sessions.sessionCards', 'sessions.cards', 'cards')
      .loadRelationCountAndMap('deck.cardsCount', 'deck.cards', 'cards')
      .where('sessions.active = true')
      .andWhere('sessions.userId = :userId')
      .setParameter('userId', userId)
      .getMany();
  }

  async history({ userId }: IListHistorySessionsDTO): Promise<Session[]> {
    return this.repository.createQueryBuilder('sessions')
      .leftJoinAndSelect('sessions.deck', 'deck')
      .loadRelationCountAndMap('sessions.sessionCards', 'sessions.cards', 'cards')
      .loadRelationCountAndMap('deck.cardsCount', 'deck.cards', 'cards')
      .where('sessions.userId = :userId')
      .andWhere('sessions.finishedAt IS NOT NULL')
      .setParameter('userId', userId)
      .getMany();
  }

  async last({ userId }: IListSessionsDTO): Promise<Session> {
    return this.repository.createQueryBuilder('sessions')
      .leftJoinAndSelect('sessions.deck', 'deck')
      .loadRelationCountAndMap('sessions.sessionCards', 'sessions.cards', 'cards')
      .loadRelationCountAndMap('deck.cardsCount', 'deck.cards', 'cards')
      .where('sessions.active = true')
      .andWhere('sessions.userId = :userId')
      .setParameter('userId', userId)
      .orderBy("sessions.createdAt", "DESC")
      .getOne();
  }

  async index({ userId, sessionId }: IIndexSessionsDTO): Promise<Session> {
    const session = await this.repository.findOne({ where: { id:sessionId, userId: userId, active:true }, relations: [ 'cards', 'deck' ] });
    
    if (!session) {
      throw new AppError("Session not found", 400);      
    }   

    return session;
  }

  async indexByDeck({ userId, deck }: IIndexSessionsDeckDTO): Promise<Session> {
    const session = await this.repository.findOne({ where: { deck, userId: userId, active:true }, relations: [ 'cards', 'deck' ] });
    
    return session;
  }

  async create({ userId, deck, cards }: ICreateSessionsDTO): Promise<Session> {
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

  async update({ session, finished_at }: IUpdateSessionsDTO): Promise<void> {
    if (!finished_at) {
      return;
    }
    
    session.finishedAt = new Date(finished_at);
    session.active = false;
    await this.repository.save(session);
  }

  async remove({ userId, sessionId }: IRemoveSessionsDTO): Promise<void> {
    const update = await this.repository.update({ id: sessionId, userId, active:true  }, {
      active: false
    })

    if (update.affected == 0) {
      throw new AppError("Session not found", 400);
    }
  }

  async filter({ olderThen, deckId }:IFilterSessionsDTO):Promise<Session[]> {
    let queryBuilder = this.repository.createQueryBuilder("sessions")
      .leftJoinAndSelect("sessions.deck", "deck")
      .leftJoinAndSelect("sessions.cards", "cards")
      .where("sessions.active = :active", { active: true });
      
    if (olderThen) {
      queryBuilder.andWhere("sessions.createdAt > :createdAt", { createdAt: olderThen });
    }

    if (deckId) {
      queryBuilder.andWhere("sessions.deckId = :deckId", { deckId });
    }

    return queryBuilder.getMany();
  }
}