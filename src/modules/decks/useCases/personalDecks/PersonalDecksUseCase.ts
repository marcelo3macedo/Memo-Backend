import { inject, injectable } from 'tsyringe';

import Deck from '@modules/decks/entities/Deck';
import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import IPersonalDecksDTO from '@modules/decks/dtos/IPersonalDecksDTO';

@injectable()
export class PersonalDecksUseCase {
  constructor(
    @inject('DecksRepository')
    private decksRepository: IDecksRepository
  ) {}

  async execute({ userId, name, page }:IPersonalDecksDTO): Promise<Deck[]> {
    return this.decksRepository.personal({ userId, name, page });
  }
}