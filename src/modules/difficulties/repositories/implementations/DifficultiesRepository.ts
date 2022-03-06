import { getRepository, Repository } from 'typeorm';

import Difficulty from '@modules/difficulties/entities/Difficulty';
import { IDifficultiesRepository } from '../IDifficultiesRepository';
import IRemoveDifficultiesDTO from '@modules/difficulties/dtos/IRemoveDifficultiesDTO';
import { CACHE_DIFFICULTIES } from '@constants/cacheKeys';

export class DifficultiesRepository implements IDifficultiesRepository {
  private repository: Repository<Difficulty>;
  private cache: any;

  constructor() {
    this.repository = getRepository(Difficulty);
    this.cache = this.repository.manager.connection.queryResultCache;
  }

  async all(): Promise<Difficulty[]> {
    return this.repository.createQueryBuilder('difficulty')
            .cache(CACHE_DIFFICULTIES)
            .getMany();
  }

  async find({ id }): Promise<Difficulty> {
    return this.repository.createQueryBuilder('difficulty')
            .where({ id })
            .cache(CACHE_DIFFICULTIES)
            .getOne();
  }

  async create({ name }): Promise<void> {
    const difficulty = this.repository.create({
        name
    });

    await this.repository.save(difficulty);
    this.cache.remove([ CACHE_DIFFICULTIES ])
  }

  async remove({ difficultyId }: IRemoveDifficultiesDTO): Promise<void> {
    await this.repository.softDelete(difficultyId);
    this.cache.remove([ CACHE_DIFFICULTIES ])
  }
}