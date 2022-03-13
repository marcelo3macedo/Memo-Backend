import { inject, injectable } from 'tsyringe';

import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import IRemoveSessionsDTO from "@modules/sessions/dtos/IRemoveSessionsDTO";
import { AppError } from '@shared/errors/AppError';
import { SESSION_NOT_FOUND } from '@constants/logger';

@injectable()
export class RemoveSessionsUseCase {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository
  ) {}

  async execute({ userId, sessionId }:IRemoveSessionsDTO): Promise<void> {
    const session = await this.sessionsRepository.index({ userId, sessionId });

    if (!session) {
      throw new AppError(SESSION_NOT_FOUND);
    }

    this.sessionsRepository.remove({ userId, sessionId });
  }
}