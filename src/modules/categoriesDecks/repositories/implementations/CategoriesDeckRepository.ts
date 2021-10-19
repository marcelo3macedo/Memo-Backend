import { getRepository, Repository } from 'typeorm';

import CategoryDeck from '@modules/categoriesDecks/entities/CategoryDeck';
import ICategoriesDeckRepository from '../ICategoriesDeckRepository';

export class CategoriesDeckRepository implements ICategoriesDeckRepository {
  private repository: Repository<CategoryDeck>;

  constructor() {
    this.repository = getRepository(CategoryDeck);
  }

  async create({ category, deck }): Promise<void> {
    const categoryDeck = this.repository.create({
        categoryId: category.id,
        deckId: deck.id
    });

    await this.repository.save(categoryDeck);
  }
}