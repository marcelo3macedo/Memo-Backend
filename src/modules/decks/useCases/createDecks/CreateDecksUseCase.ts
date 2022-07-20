import { inject, injectable } from 'tsyringe';

import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import ICreateDecksDTO from "@modules/decks/dtos/ICreateDecksDTO";
import Deck from '@modules/decks/entities/Deck';
import limit from '@config/limit';
import { AppError } from '@shared/errors/AppError';
import { DECK_LIMIT_REACHED } from '@constants/logger';
import ValueManager from '@lib/ValueManager';

@injectable()
export class CreateDecksUseCase {
  constructor(
    @inject('DecksRepository')
    private decksRepository: IDecksRepository
  ) {}

  async execute({ name, description, userId, frequencyId, isPublic, clonedBy, categoryId }: ICreateDecksDTO): Promise<Deck> {
    const userDecks = await this.decksRepository.count({ userId })
    
    if (userDecks > limit.decks) {
      throw new AppError(DECK_LIMIT_REACHED, 401);
    }
    
    const path = ValueManager.toEncoded(name);
    return this.decksRepository.create({ name, description, path, userId, frequencyId, isPublic, clonedBy, categoryId });
  }
}