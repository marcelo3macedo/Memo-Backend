import { inject, injectable } from 'tsyringe';

import Card from '@modules/cards/entities/Card';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import ICreateCardsDTO from "@modules/cards/dtos/ICreateCardsDTO";

@injectable()
export class CreateCardsUseCase {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository
  ) {}

  async execute({ deck, content, secretContent }:ICreateCardsDTO): Promise<Card> {
    return this.cardsRepository.create({ deck, content, secretContent });
  }
}