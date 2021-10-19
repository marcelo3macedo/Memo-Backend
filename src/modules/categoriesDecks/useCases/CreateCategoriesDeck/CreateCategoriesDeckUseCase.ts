import { inject, injectable } from 'tsyringe';

import ICreateCategoriesDeckDTO from '@modules/categoriesDecks/dtos/ICreateCategoriesDeckDTO';
import ICategoriesDeckRepository from '@modules/categoriesDecks/repositories/ICategoriesDeckRepository';

@injectable()
export class CreateCategoriesDeckUseCase {
  constructor(
    @inject('CategoriesDeckRepository')
    private categoriesDeckRepository: ICategoriesDeckRepository
  ) {}

  async execute({ category, deck }:ICreateCategoriesDeckDTO): Promise<void> {
    this.categoriesDeckRepository.create({ category, deck });
  }
}