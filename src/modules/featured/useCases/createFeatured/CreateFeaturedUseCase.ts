import { inject, injectable } from 'tsyringe';

import ICreateFeaturedDecks from '@modules/featured/dtos/ICreateFeaturedDecks';
import { IFeaturedDecksRepository } from '@modules/featured/repositories/IFeaturedDecksRepository';

@injectable()
export class CreateFeaturedUseCase {
  constructor(
    @inject('FeaturedDecksRepository')
    private featuredDecksRepository: IFeaturedDecksRepository
  ) {}

  async execute({ deck }:ICreateFeaturedDecks): Promise<void> {
    this.featuredDecksRepository.create({ deck });
  }
}