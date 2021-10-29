import { inject, injectable } from 'tsyringe';

import { IDifficultiesRepository } from '@modules/difficulties/repositories/IDifficultiesRepository';
import ICreateDifficultiesDTO from '@modules/difficulties/dtos/ICreateDifficultiesDTO';

@injectable()
export class CreateDifficultiesUseCase {
  constructor(
    @inject('DifficultiesRepository')
    private difficultiesRepository: IDifficultiesRepository
  ) {}

  async execute({ name }: ICreateDifficultiesDTO): Promise<void> {
    this.difficultiesRepository.create({ name });
  }
}