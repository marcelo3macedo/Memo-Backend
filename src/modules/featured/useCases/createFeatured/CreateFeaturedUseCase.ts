import { inject, injectable } from 'tsyringe';

import ICreateFeaturedDecksDTO from '@modules/featured/dtos/ICreateFeaturedDecksDTO';
import { IFeaturedDecksRepository } from '@modules/featured/repositories/IFeaturedDecksRepository';

@injectable()
export class CreateFeaturedUseCase {
  constructor(
    @inject('FeaturedDecksRepository')
    private featuredDecksRepository: IFeaturedDecksRepository
  ) {}

  async execute({ deck }:ICreateFeaturedDecksDTO): Promise<void> {
    this.featuredDecksRepository.create({ deck });
  }
}