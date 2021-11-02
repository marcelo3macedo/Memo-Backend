import FeaturedType from '@modules/featured/entities/FeaturedType';
import { getRepository, Repository } from 'typeorm';

import { IFeaturedTypeRepository } from '../IFeaturedTypeRepository';

export class FeaturedTypeRepository implements IFeaturedTypeRepository {
  private repository: Repository<FeaturedType>;

  constructor() {
    this.repository = getRepository(FeaturedType);
  }

  async all(): Promise<FeaturedType[]> {
    return this.repository.find();
  }

  async find({ name }): Promise<FeaturedType> {
    return this.repository.findOne({ where: { name }});
  }

  async remove({ featuredTypeId }): Promise<void> {
    await this.repository.softDelete(featuredTypeId);
  }
}