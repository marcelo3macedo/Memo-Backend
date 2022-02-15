import { getRepository, Repository } from 'typeorm';

import { ISessionsCardsRepository } from '../ISessionsCardsRepository';
import SessionCard from '@modules/sessionsCards/entities/SessionCard';
import IUpdateSessionsCardsDTO from '@modules/sessionsCards/dtos/IUpdateSessionsCardsDTO';
import IIndexSessionsCardsDTO from '@modules/sessionsCards/dtos/IIndexSessionsCardsDTO';
import { AppError } from '@shared/errors/AppError';
import { SESSIONCARD_NOTFOUND } from 'constants/logger';

export class SessionsCardsRepository implements ISessionsCardsRepository {
  private repository: Repository<SessionCard>;

  constructor() {
    this.repository = getRepository(SessionCard);
  }

  async index({ cardId, sessionId }: IIndexSessionsCardsDTO): Promise<SessionCard> {
    const sessionCard = await this.repository.findOne({ where: { sessionsId:sessionId, cardsId:cardId}});
    
    if (!sessionCard) {
      throw new AppError(SESSIONCARD_NOTFOUND, 400);      
    }   

    return sessionCard;
  }

  async update({ sessionCard }: IUpdateSessionsCardsDTO): Promise<void> {
    await this.repository.save(sessionCard);
    
    await this.repository.softDelete({ 
      sessionsId: sessionCard.sessionsId, 
      cardsId: sessionCard.cardsId 
    });
  }
}