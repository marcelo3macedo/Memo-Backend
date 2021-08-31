import { inject, injectable } from 'tsyringe';

import Difficulty from '@modules/difficulties/entities/Difficulty';
import { IDifficultiesRepository } from '@modules/difficulties/repositories/IDifficultiesRepository';

@injectable()
export class ListDifficultiesUseCase {
  constructor(
    @inject('DifficultiesRepository')
    private difficultiesRepository: IDifficultiesRepository
  ) {}

  async execute(): Promise<Difficulty[]> {
    return this.difficultiesRepository.all();
  }
}