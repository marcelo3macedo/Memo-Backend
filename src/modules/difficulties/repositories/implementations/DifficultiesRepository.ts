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
    return this.repository.find();
  }

  async remove({ difficultyId }: IRemoveDifficultiesDTO): Promise<void> {
    await this.repository.softDelete(difficultyId);
  }
}