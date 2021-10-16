import { inject, injectable } from 'tsyringe';

import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import ICreateDecksDTO from "@modules/decks/dtos/ICreateDecksDTO";
import Deck from '@modules/decks/entities/Deck';

@injectable()
export class CreateDecksUseCase {
  constructor(
    @inject('DecksRepository')
    private decksRepository: IDecksRepository
  ) {}

  async execute({ name, parentId, userId }: ICreateDecksDTO): Promise<Deck> {
    return await this.decksRepository.create({ name, parentId, userId });
  }
}