import { inject, injectable } from 'tsyringe';

import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import ICreateSessionsDTO from "@modules/sessions/dtos/ICreateSessionsDTO";
import Session from '@modules/sessions/entities/Session';

@injectable()
export class CreateSessionsUseCase {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository
  ) {}

  async execute({ userId, deck, cards }:ICreateSessionsDTO): Promise<Session> {
    return this.sessionsRepository.create({ userId, deck, cards });
  }
}