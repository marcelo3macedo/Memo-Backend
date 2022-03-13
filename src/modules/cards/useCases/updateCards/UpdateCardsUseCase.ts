import { inject, injectable } from 'tsyringe';

import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import IUpdateCardsDTO from "@modules/cards/dtos/IUpdateCardsDTO";
import { AppError } from '@shared/errors/AppError';
import { CARD_NOTFOUND } from '@constants/logger';

@injectable()
export class UpdateCardsUseCase {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository
  ) {}

  async execute({ cardId, title, content, secretContent }:IUpdateCardsDTO): Promise<void> {
    const card = await this.cardsRepository.index({ cardId });

    if (!card) {
      throw new AppError(CARD_NOTFOUND);      
    }

    return this.cardsRepository.update({ cardId, title, content, secretContent });
  }
}