import cache from '@config/cache';
import Frequency from '@modules/frequencies/entities/Frequency';
import { getRepository, Repository } from 'typeorm';
import IFrequenciesRepository from '../IFrequenciesRepository';


export class FrequenciesRepository implements IFrequenciesRepository {
  private repository: Repository<Frequency>;

  constructor() {
    this.repository = getRepository(Frequency);
  }

  async list(): Promise<Frequency[]> {
    return this.repository.find({ cache: cache.milliseconds });
  }

  async getDefault(): Promise<Frequency> {
    return this.repository.findOne({ where: { default: true } });
  }
}