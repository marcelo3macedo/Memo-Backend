import { getRepository, Repository } from 'typeorm';

import Category from '../../entities/Category';
import ICategoriesRepository from '../ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async list(): Promise<Category[]> {
    return this.repository.find();
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
}