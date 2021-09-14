import { inject, injectable } from 'tsyringe';

import Session from '@modules/sessions/entities/Session';
import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import IIndexSessionsDeckDTO from '@modules/sessions/dtos/IIndexSessionsDeckDTO';

@injectable()
export class IndexDeckSessionsUseCase {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository
  ) {}

  async execute({ userId, deck }:IIndexSessionsDeckDTO): Promise<Session> {
    return this.sessionsRepository.indexByDeck({ userId, deck });
  }
}