import CacheManager from 'lib/CacheManager';
import { getRepository, Repository } from 'typeorm';

import Category from '../../entities/Category';
import ICategoriesRepository from '../ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async list(): Promise<Category[]> {
    const repository = this.repository.createQueryBuilder('categories')
    
    repository.cache(CacheManager.getId(repository), CacheManager.getHighTtl());

    return repository.getMany();
  }

  async create({ name }): Promise<void> {
    const category = this.repository.create({
        name
    });

    await this.repository.save(category);
  }

  async index({ categoryId }): Promise<Category> {
    return this.repository.findOne({ id: categoryId });
  }

  async remove({ categoryId }): Promise<void> {
    await this.repository.softDelete(categoryId);
  }
}