import { inject, injectable } from 'tsyringe';

import Deck from '@modules/decks/entities/Deck';
import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import IIndexDecksDTO from "@modules/decks/dtos/IIndexDecksDTO";

@injectable()
export class IndexDecksUseCase {
  constructor(
    @inject('DecksRepository')
    private decksRepository: IDecksRepository
  ) {}

  async execute({ deckId, userId }: IIndexDecksDTO): Promise<Deck> {
    return this.decksRepository.index({ deckId, userId });
  }
}