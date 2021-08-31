import { inject, injectable } from 'tsyringe';

import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import IUpdateSessionsDTO from "@modules/sessions/dtos/IUpdateSessionsDTO";

@injectable()
export class UpdateSessionsUseCase {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository
  ) {}

  async execute({ session, finished_at }:IUpdateSessionsDTO): Promise<void> {
    return this.sessionsRepository.update({ session, finished_at });
  }
}