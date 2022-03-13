import { inject, injectable } from 'tsyringe';

import ICreateFeaturedDecksDTO from '@modules/featured/dtos/ICreateFeaturedDecksDTO';
import { IFeaturedDecksRepository } from '@modules/featured/repositories/IFeaturedDecksRepository';
import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import { AppError } from '@shared/errors/AppError';
import { DECK_NOTFOUND } from '@constants/logger';

@injectable()
export class CreateFeaturedUseCase {
  constructor(
    @inject('FeaturedDecksRepository')
    private featuredDecksRepository: IFeaturedDecksRepository,
    @inject('DecksRepository')
    private decksRepository: IDecksRepository
  ) {}

  async execute({ deckId }:ICreateFeaturedDecksDTO): Promise<void> {
    const deck = await this.decksRepository.index({ deckId });

    if (!deck) {
      throw new AppError(DECK_NOTFOUND);
    }

    this.featuredDecksRepository.create({ deck });
  }
}