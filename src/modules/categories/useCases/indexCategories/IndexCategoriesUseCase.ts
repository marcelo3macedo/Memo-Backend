import { inject, injectable } from 'tsyringe';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import Category from "@modules/categories/entities/Category";
import IIndexCategoriesDTO from '@modules/categories/dtos/IIndexCategoriesDTO';

@injectable()
export class IndexCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ categoryId }:IIndexCategoriesDTO): Promise<Category> {
    return this.categoriesRepository.index({ categoryId });
  }
}