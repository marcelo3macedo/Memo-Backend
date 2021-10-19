import { inject, injectable } from 'tsyringe';

import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';
import ICreateCategoriesDTO from '@modules/categories/dtos/ICreateCategoriesDTO';

@injectable()
export class CreateCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name }:ICreateCategoriesDTO): Promise<void> {
    this.categoriesRepository.create({ name });
  }
}