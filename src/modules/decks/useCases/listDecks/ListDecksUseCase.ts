import { inject, injectable } from 'tsyringe';

import Deck from '@modules/decks/entities/Deck';
import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import IListDecksDTO from "@modules/decks/dtos/IListDecksDTO";

@injectable()
export class ListDecksUseCase {
  constructor(
    @inject('DecksRepository')
    private decksRepository: IDecksRepository
  ) {}

  async execute({ userId, name, isPublic }:IListDecksDTO): Promise<Deck[]> {
    return this.decksRepository.list({ userId, name, isPublic });
  }
}