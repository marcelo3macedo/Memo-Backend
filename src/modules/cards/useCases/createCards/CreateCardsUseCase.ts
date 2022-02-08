import { inject, injectable } from 'tsyringe';

import Card from '@modules/cards/entities/Card';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import ICreateCardsDTO from "@modules/cards/dtos/ICreateCardsDTO";
import limit from '@config/limit';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateCardsUseCase {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository
  ) {}

  async execute({ deck, title, content, secretContent }:ICreateCardsDTO): Promise<Card> {
    const deckCards = await this.cardsRepository.count({ deckId: deck.id })
    
    if (deckCards > limit.cards) {
      throw new AppError(`Cards Limit reached for Deck: ${deck.id}`, 401);
    }

    return this.cardsRepository.create({ deck, title, content, secretContent });
  }
}