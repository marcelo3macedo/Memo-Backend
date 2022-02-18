import { inject, injectable } from 'tsyringe';

import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import IUpdateDecksDTO from '@modules/decks/dtos/IUpdateDecksDTO';

@injectable()
export class UpdateDecksUseCase {
  constructor(
    @inject('DecksRepository')
    private decksRepository: IDecksRepository
  ) {}

  async execute({ deckId, name, description, frequencyId }: IUpdateDecksDTO): Promise<void> {
    await this.decksRepository.update({ deckId, name, description, frequencyId });
  }
}