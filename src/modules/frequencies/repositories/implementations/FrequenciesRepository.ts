import { getRepository, Repository } from 'typeorm';

import { CACHE_FREQUENCIES } from '@constants/cacheKeys';
import Frequency from '@modules/frequencies/entities/Frequency';
import IFrequenciesRepository from '../IFrequenciesRepository';


export class FrequenciesRepository implements IFrequenciesRepository {
  private repository: Repository<Frequency>;

  constructor() {
    this.repository = getRepository(Frequency);
  }

  async list(): Promise<Frequency[]> {
    return this.repository.createQueryBuilder('frequencies')
      .cache(CACHE_FREQUENCIES)
      .getMany()
  }

  async getDefault(): Promise<Frequency> {
    return this.repository.createQueryBuilder('frequencies')
      .where({ default: true })
      .cache(CACHE_FREQUENCIES)
      .getOne()
  }
}