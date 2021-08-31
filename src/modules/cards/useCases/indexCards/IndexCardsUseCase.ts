import { inject, injectable } from 'tsyringe';

import Card from '@modules/cards/entities/Card';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import IIndexCardsDTO from "@modules/cards/dtos/IIndexCardsDTO";

@injectable()
export class IndexCardsUseCase {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository
  ) {}

  async execute({ deck, cardId }:IIndexCardsDTO): Promise<Card> {
    return this.cardsRepository.index({ deck, cardId });
  }
}