import { inject, injectable } from 'tsyringe';

import IFeedSessionsDTO from '@modules/sessions/dtos/IFeedSessionsDTO';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import Card from '@modules/cards/entities/Card';

@injectable()
export class FeedSessionsUseCase {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository
  ) {}

  async execute({ deck }:IFeedSessionsDTO): Promise<Card[]> {
    return await this.cardsRepository.filter({ deckId: deck.id, limit: parseInt(process.env.PROCESSOR_CARDS_LIMIT) });
  }
}