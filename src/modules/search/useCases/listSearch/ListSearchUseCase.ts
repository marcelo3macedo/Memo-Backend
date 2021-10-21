import { inject, injectable } from 'tsyringe';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import IListSearchDTO from '@modules/search/dtos/IListSearchDTO';
import { IFeaturedDecksRepository } from '@modules/featured/repositories/IFeaturedDecksRepository';
import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';

@injectable()
export class ListSearchUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
    @inject('DecksRepository')
    private decksRepository: IDecksRepository,
    @inject('FeaturedDecksRepository')
    private featuredDecksRepository: IFeaturedDecksRepository
  ) {}

  async execute({ query }): Promise<IListSearchDTO> {
    const categories = await this.categoriesRepository.list();
    const featured = await this.featuredDecksRepository.all();
    const decks = await this.decksRepository.search({ query });

    return {
      decks,
      categories,
      featured
    }
  }
}