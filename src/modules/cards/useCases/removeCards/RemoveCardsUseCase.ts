import { inject, injectable } from 'tsyringe';

import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import IRemoveCardsDTO from "@modules/cards/dtos/IRemoveCardsDTO";
import { AppError } from '@shared/errors/AppError';
import { CARD_NOTFOUND } from '@constants/logger';

@injectable()
export class RemoveCardsUseCase {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository
  ) {}

  async execute({ cardId }:IRemoveCardsDTO): Promise<void> {
    const card = await this.cardsRepository.index({ cardId });

    if (!card) {
      throw new AppError(CARD_NOTFOUND);      
    }

    return this.cardsRepository.remove({ cardId, deckId: card.deckId });
  }
}