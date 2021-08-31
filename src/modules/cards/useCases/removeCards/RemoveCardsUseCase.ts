import { inject, injectable } from 'tsyringe';

import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import IRemoveCardsDTO from "@modules/cards/dtos/IRemoveCardsDTO";

@injectable()
export class RemoveCardsUseCase {
  constructor(
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository
  ) {}

  async execute({ cardId }:IRemoveCardsDTO): Promise<void> {
    return this.cardsRepository.remove({ cardId });
  }
}