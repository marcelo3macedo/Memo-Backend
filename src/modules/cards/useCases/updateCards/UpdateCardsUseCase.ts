import { inject, injectable } from 'tsyringe';

import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import IUpdateCardsDTO from "@modules/cards/dtos/IUpdateCardsDTO";

@injectable()
export class UpdateCardsUseCase {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository
  ) {}

  async execute({ cardId, title, content, secretContent }:IUpdateCardsDTO): Promise<void> {
    return this.cardsRepository.update({ cardId, title, content, secretContent });
  }
}