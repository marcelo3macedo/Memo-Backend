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

  async execute({ deckId, path, userId, isPublic }: IIndexDecksDTO): Promise<Deck> {
    let deck = null

    if (!deckId && !path) {
      throw new AppError(DECK_NOTFOUND, 400);      
    }

    deck = path ?
      await this.decksRepository.indexByPath({ path }) :
      await this.decksRepository.index({ deckId, userId, isPublic })

    if (!deck) {
      throw new AppError(DECK_NOTFOUND, 400);      
    }

    deck.isSaved = await this.decksRepository.checkIsSaved({ userId, deckId: deck.id })

    return deck
  }
}