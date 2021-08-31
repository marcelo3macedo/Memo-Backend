import { inject, injectable } from 'tsyringe';

import Card from '@modules/cards/entities/Card';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import IListCardsDTO from "@modules/cards/dtos/IListCardsDTO";

@injectable()
export class ListCardsUseCase {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository
  ) {}

  async execute({ deckId }:IListCardsDTO): Promise<Card[]> {
    return this.cardsRepository.list({ deckId });
  }
}