import { inject, injectable } from 'tsyringe';

import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import Deck from '@modules/decks/entities/Deck';
import ICloneDecksDTO from '@modules/decks/dtos/ICloneDecksDTO';
import IFrequenciesRepository from '@modules/frequencies/repositories/IFrequenciesRepository';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import { AppError } from '@shared/errors/AppError';
import { DECK_NOTFOUND, FREQUENCY_NOTFOUND } from '@constants/logger';

@injectable()
export class CloneDecksUseCase {
  constructor(
    @inject('DecksRepository')
    private decksRepository: IDecksRepository,
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,
    @inject('FrequenciesRepository')
    private frequenciesRepository: IFrequenciesRepository
  ) {}

  async execute({ deckId, userId }: ICloneDecksDTO): Promise<Deck> {
    const deck = await this.decksRepository.index({ deckId });
    if (!deck) {
      throw new AppError(DECK_NOTFOUND);
    }

    const defaultFrequency = await this.frequenciesRepository.getDefault();
    const { id: frequencyId } = defaultFrequency || {};

    const newDeck = await this.decksRepository.create({ 
      name: deck.name, 
      parentId: deck.parentId, 
      userId, 
      isPublic: false,
      clonedBy: deck.id,
      frequencyId
    });

    if (!deck.cards) {
      return newDeck;
    }
    
    newDeck.cards = [];
    deck.cards.map(async c => {
      c.deck = newDeck;
      await this.cardsRepository.create(c);
      newDeck.cards.push(c);
    });

    return newDeck
  }
}