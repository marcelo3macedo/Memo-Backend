import { inject, injectable } from 'tsyringe';

import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import { IFeaturedTypeRepository } from '@modules/featured/repositories/IFeaturedTypeRepository';
import IListSessionsDTO from "@modules/sessions/dtos/IListSessionsDTO";
import IReviewDTO from '@modules/review/dtos/IReviewDTO';
import { IFeaturedDecksRepository } from '@modules/featured/repositories/IFeaturedDecksRepository';
@injectable()
export class ListReviewUseCase {
  constructor(
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('FeaturedTypeRepository')
    private featuredTypeRepository: IFeaturedTypeRepository,
    @inject('FeaturedDecksRepository')
    private featuredDecksRepository: IFeaturedDecksRepository,
  ) {}

  async execute({ userId }:IListSessionsDTO): Promise<IReviewDTO> {
    let featuredDecks = [];
    const lastSession = await this.sessionsRepository.last({ userId });
    const sessions = await this.sessionsRepository.list({ userId });
    const type = await this.featuredTypeRepository.find({ name: "home-page" });
    
    if (type) {
      featuredDecks = await this.featuredDecksRepository.filter({ type });
    }

    return {
      lastSession,
      sessions,
      featuredDecks
    }
  }
}