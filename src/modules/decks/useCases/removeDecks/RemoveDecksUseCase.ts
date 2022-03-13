import { inject, injectable } from 'tsyringe';

import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import IRemoveDecksDTO from "@modules/decks/dtos/IRemoveDecksDTO";
import { AppError } from '@shared/errors/AppError';
import { DECK_NOTFOUND, NOT_ALLOWED } from '@constants/logger';

@injectable()
export class RemoveDecksUseCase {
  constructor(
    @inject('DecksRepository')
    private decksRepository: IDecksRepository
  ) {}

  async execute({ deckId, userId }: IRemoveDecksDTO): Promise<void> {
    const deck = await this.decksRepository.index({ deckId });

    if (!deck) {
      throw new AppError(DECK_NOTFOUND);
    }

    if (deck.userId !== userId) {
      throw new AppError(NOT_ALLOWED);
    }

    await this.decksRepository.remove({ deckId, userId });
  }
}