import { inject, injectable } from 'tsyringe';

import Session from '@modules/sessions/entities/Session';
import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import IIndexSessionsDTO from "@modules/sessions/dtos/IIndexSessionsDTO";

@injectable()
export class IndexSessionsUseCase {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository
  ) {}

  async execute({ userId, sessionId }:IIndexSessionsDTO): Promise<Session> {
    return this.sessionsRepository.index({ userId, sessionId });
  }
}