import IIndexFeaturedType from '@modules/featured/dtos/IIndexFeaturedType';
import FeaturedType from '@modules/featured/entities/FeaturedType';
import { getRepository, Repository } from 'typeorm';

import { IFeaturedTypeRepository } from '../IFeaturedTypeRepository';

export class FeaturedTypeRepository implements IFeaturedTypeRepository {
  private repository: Repository<FeaturedType>;

  constructor() {
    this.repository = getRepository(FeaturedType);
  }

  async all(): Promise<FeaturedType[]> {
    return this.repository.find({ where: { active: true }});
  }

  async find(data: IIndexFeaturedType): Promise<FeaturedType> {
    return this.repository.findOne({ where: { active: true, name: data.name }});
  }
}