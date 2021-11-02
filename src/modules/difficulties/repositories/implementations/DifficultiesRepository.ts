import cache from '@config/cache';
import { getRepository, Repository } from 'typeorm';

import Difficulty from '@modules/difficulties/entities/Difficulty';
import { IDifficultiesRepository } from '../IDifficultiesRepository';
import IRemoveDifficultiesDTO from '@modules/difficulties/dtos/IRemoveDifficultiesDTO';

export class DifficultiesRepository implements IDifficultiesRepository {
  private repository: Repository<Difficulty>;

  constructor() {
    this.repository = getRepository(Difficulty);
  }

  async all(): Promise<Difficulty[]> {
    return this.repository.find({ cache: cache.milliseconds });
  }

  async create({ name }): Promise<void> {
    const difficulty = this.repository.create({
        name
    });

    await this.repository.save(difficulty);
  }

  async remove({ difficultyId }: IRemoveDifficultiesDTO): Promise<void> {
    await this.repository.softDelete(difficultyId);
  }
}