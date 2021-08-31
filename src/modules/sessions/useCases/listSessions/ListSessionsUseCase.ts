import { inject, injectable } from 'tsyringe';

import Session from '@modules/sessions/entities/Session';
import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import IListSessionsDTO from "@modules/sessions/dtos/IListSessionsDTO";

@injectable()
export class ListSessionsUseCase {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository
  ) {}

  async execute({ userId }:IListSessionsDTO): Promise<Session[]> {
    return this.sessionsRepository.list({ userId });
  }
}