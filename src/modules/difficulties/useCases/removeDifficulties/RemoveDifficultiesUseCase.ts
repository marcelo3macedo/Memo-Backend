import { inject, injectable } from 'tsyringe';

import { IDifficultiesRepository } from '@modules/difficulties/repositories/IDifficultiesRepository';
import IRemoveDifficultiesDTO from '@modules/difficulties/dtos/IRemoveDifficultiesDTO';

@injectable()
export class RemoveDifficultiesUseCase {
  constructor(
    @inject('DifficultiesRepository')
    private difficultiesRepository: IDifficultiesRepository
  ) {}

  async execute({ difficultyId }: IRemoveDifficultiesDTO): Promise<void> {
    this.difficultiesRepository.remove({ difficultyId });
  }
}