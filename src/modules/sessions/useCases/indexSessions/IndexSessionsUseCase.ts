import { inject, injectable } from 'tsyringe';

import Session from '@modules/sessions/entities/Session';
import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import IIndexSessionsDTO from "@modules/sessions/dtos/IIndexSessionsDTO";
import { AppError } from '@shared/errors/AppError';
import { SESSION_NOT_FOUND } from '@constants/logger';

@injectable()
export class IndexSessionsUseCase {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository
  ) {}

  async execute({ userId, sessionId }:IIndexSessionsDTO): Promise<Session> {
    const session = await this.sessionsRepository.index({ userId, sessionId });

    if (!session) {
      throw new AppError(SESSION_NOT_FOUND);
    }

    return session;
  }
}