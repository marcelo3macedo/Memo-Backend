import { getRepository, Repository } from 'typeorm';

import Category from '../../entities/Category';
import ICategoriesRepository from '../ICategoriesRepository';
import { CACHE_CATEGORIES } from '@constants/cacheKeys';
export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;
  private cache: any;

  constructor() {
    this.repository = getRepository(Category);
    this.cache = this.repository.manager.connection.queryResultCache;
  }

  async list(): Promise<Category[]> {
    return this.repository.createQueryBuilder('categories')
            .cache(CACHE_CATEGORIES)
            .getMany();
  }

  async create({ name }): Promise<void> {
    const category = this.repository.create({
        name
    });

    await this.repository.save(category);
    this.cache.remove([ CACHE_CATEGORIES ]);
  }

  async index({ categoryId }): Promise<Category> {
    return this.repository.createQueryBuilder('categories')
            .where({ id: categoryId })
            .cache(CACHE_CATEGORIES)
            .getOne();
  }

  async remove({ categoryId }): Promise<void> {
    await this.repository.softDelete(categoryId);
    this.cache.remove([ CACHE_CATEGORIES ]);
  }
}