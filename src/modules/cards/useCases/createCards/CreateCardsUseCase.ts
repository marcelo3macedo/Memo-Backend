import { inject, injectable } from 'tsyringe';

import Card from '@modules/cards/entities/Card';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import ICreateCardsDTO from "@modules/cards/dtos/ICreateCardsDTO";
import limit from '@config/limit';
import { AppError } from '@shared/errors/AppError';
import { CARDS_LIMIT_REACHED, DECK_NOTFOUND } from '@constants/logger';

@injectable()
export class CreateCardsUseCase {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository
  ) {}

  async execute({ deck, title, content, secretContent }:ICreateCardsDTO): Promise<Card> {
    if (!deck) {
      throw new AppError(DECK_NOTFOUND);
    }

    const deckCards = await this.cardsRepository.count({ deckId: deck.id });    
    if (deckCards > limit.cards) {
      throw new AppError(CARDS_LIMIT_REACHED, 401);
    }

    return this.cardsRepository.create({ deck, title, content, secretContent });
  }
}