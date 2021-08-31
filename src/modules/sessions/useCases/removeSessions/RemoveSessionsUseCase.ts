import { inject, injectable } from 'tsyringe';

import Session from '@modules/sessions/entities/Session';
import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import IRemoveSessionsDTO from "@modules/sessions/dtos/IRemoveSessionsDTO";

@injectable()
export class RemoveSessionsUseCase {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository
  ) {}

  async execute({ userId, sessionId }:IRemoveSessionsDTO): Promise<void> {
    return this.sessionsRepository.remove({ userId, sessionId });
  }
}