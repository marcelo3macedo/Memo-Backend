import { inject, injectable } from 'tsyringe';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import IListSearchDTO from '@modules/search/dtos/IListSearchDTO';

@injectable()
export class ListSearchUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<IListSearchDTO> {
    const categories = await this.categoriesRepository.list();

    return {
      categories
    }
  }
}