import { inject, injectable } from 'tsyringe';

import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import IUpdateDecksDTO from '@modules/decks/dtos/IUpdateDecksDTO';
import { AppError } from '@shared/errors/AppError';
import { DECK_NOTFOUND } from '@constants/logger';

@injectable()
export class UpdateDecksUseCase {
  constructor(
    @inject('DecksRepository')
    private decksRepository: IDecksRepository
  ) {}

  async execute({ deckId, name, description, frequencyId, userId }: IUpdateDecksDTO): Promise<void> {
    const deck = await this.decksRepository.index({ deckId });

    if (!deck) {
      throw new AppError(DECK_NOTFOUND);
    }

    await this.decksRepository.update({ deckId, name, description, frequencyId, userId });
  }
}