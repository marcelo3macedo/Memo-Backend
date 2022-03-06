import { inject, injectable } from 'tsyringe';

import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import IListSessionsDTO from "@modules/sessions/dtos/IListSessionsDTO";
import IReviewDTO from '@modules/review/dtos/IReviewDTO';
import { IFeaturedDecksRepository } from '@modules/featured/repositories/IFeaturedDecksRepository';
@injectable()
export class ListReviewUseCase {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('FeaturedDecksRepository')
    private featuredDecksRepository: IFeaturedDecksRepository,
  ) {}

  async execute({ userId }:IListSessionsDTO): Promise<IReviewDTO> {
    const lastSession = await this.sessionsRepository.last({ userId });
    const sessions = await this.sessionsRepository.list({ userId });
    const featuredDecks = await this.featuredDecksRepository.all();      

    return {
      lastSession,
      sessions,
      featuredDecks
    }
  }
}