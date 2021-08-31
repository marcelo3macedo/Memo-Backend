import { inject, injectable } from 'tsyringe';

import IUpdateSessionsCardsDTO from '@modules/sessionsCards/dtos/IUpdateSessionsCardsDTO';
import { ISessionsCardsRepository } from '@modules/sessionsCards/repositories/ISessionsCardsRepository';

@injectable()
export class UpdateSessionsCardsUseCase {
  constructor(
    @inject('SessionsCardsRepository')
    private sessionsCardsRepository: ISessionsCardsRepository
  ) {}

  async execute({ sessionCard }:IUpdateSessionsCardsDTO): Promise<void> {
    return this.sessionsCardsRepository.update({ sessionCard });
  }
}