import { inject, injectable } from 'tsyringe';

import IFrequenciesRepository from '@modules/frequencies/repositories/IFrequenciesRepository';
import Frequency from '@modules/frequencies/entities/Frequency';

@injectable()
export class ListFrequenciesUseCase {
  constructor(
    @inject('FrequenciesRepository')
    private frequenciesRepository: IFrequenciesRepository
  ) {}

  async execute(): Promise<Frequency[]> {
    return this.frequenciesRepository.list();
  }
}