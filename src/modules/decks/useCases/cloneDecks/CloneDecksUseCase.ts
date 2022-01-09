import { inject, injectable } from 'tsyringe';

import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import Deck from '@modules/decks/entities/Deck';
import ICloneDecksDTO from '@modules/decks/dtos/ICloneDecksDTO';
import IFrequenciesRepository from '@modules/frequencies/repositories/IFrequenciesRepository';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';

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

  async execute({ deck, userId }: ICloneDecksDTO): Promise<Deck> {
    const defaultFrequency = await this.frequenciesRepository.getDefault();

    if (!defaultFrequency) {
      return;
    }

    const newDeck = await this.decksRepository.create({ 
      name: deck.name, 
      parentId: deck.parentId, 
      userId, 
      isPublic: false,
      clonedBy: deck.id,
      frequencyId: defaultFrequency.id
    });

    deck.cards.map(async c => {
      c.deck = newDeck;
      await this.cardsRepository.create(c)
    })

    return newDeck
  }
}