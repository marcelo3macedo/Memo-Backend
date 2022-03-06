import FeaturedType from '@modules/featured/entities/FeaturedType';
import { getRepository, Repository } from 'typeorm';

import { IFeaturedTypeRepository } from '../IFeaturedTypeRepository';
import { CACHE_FEATURED_TYPE } from '@constants/cacheKeys';

export class FeaturedTypeRepository implements IFeaturedTypeRepository {
  private repository: Repository<FeaturedType>;
  private cache: any;

  constructor() {
    this.repository = getRepository(FeaturedType);
    this.cache = this.repository.manager.connection.queryResultCache;
  }

  async all(): Promise<FeaturedType[]> {
    return this.repository.createQueryBuilder('featuredType')
      .cache([ CACHE_FEATURED_TYPE ])
      .getMany()
  }

  async find({ name }): Promise<FeaturedType> {
    return this.repository.createQueryBuilder('featuredType')
      .where({ name })
      .cache([ CACHE_FEATURED_TYPE ])
      .getOne()
  }

  async remove({ featuredTypeId }): Promise<void> {
    await this.repository.softDelete(featuredTypeId);
    this.cache.remove([ CACHE_FEATURED_TYPE ])
  }
}