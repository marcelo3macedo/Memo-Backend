import { inject, injectable } from 'tsyringe';

import Deck from '@modules/decks/entities/Deck';
import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import IIndexDecksDTO from "@modules/decks/dtos/IIndexDecksDTO";
import { AppError } from '@shared/errors/AppError';
import { DECK_NOTFOUND } from '@constants/logger';

@injectable()
export class IndexDecksUseCase {
  constructor(
    @inject('DecksRepository')
    private decksRepository: IDecksRepository
  ) {}

  async execute({ deckId, path, userId }: IIndexDecksDTO): Promise<Deck> {
    if (path) {
      return this.decksRepository.findByPath({ path });
    }

    const deck = await this.decksRepository.index({ deckId });
    if (!deck) {
      throw new AppError(DECK_NOTFOUND, 400);      
    }

    if (deck.isPublic == false && deck.userId !== userId) {
      throw new AppError(DECK_NOTFOUND, 400);    
    }

    deck.isSaved = await this.decksRepository.checkIsSaved({ userId, deckId: deck.id });

    return deck
  }
}