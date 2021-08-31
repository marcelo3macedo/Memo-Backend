import { getRepository, Repository } from 'typeorm';

import Difficulty from '@modules/difficulties/entities/Difficulty';
import { IDifficultiesRepository } from '../IDifficultiesRepository';

export class DifficultiesRepository implements IDifficultiesRepository {
  private repository: Repository<Difficulty>;

  constructor() {
    this.repository = getRepository(Difficulty);
  }

  async all(): Promise<Difficulty[]> {
    return this.repository.find({ where: { active: true }});
  }
}