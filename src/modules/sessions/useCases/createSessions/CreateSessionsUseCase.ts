import { inject, injectable } from 'tsyringe';

import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import ICreateSessionsDTO from "@modules/sessions/dtos/ICreateSessionsDTO";

@injectable()
export class CreateSessionsUseCase {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository
  ) {}

  async execute({ userId, deck, cards }:ICreateSessionsDTO): Promise<void> {
    return this.sessionsRepository.create({ userId, deck, cards });
  }
}