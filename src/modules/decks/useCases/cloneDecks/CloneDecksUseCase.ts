import { inject, injectable } from 'tsyringe';

import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import Deck from '@modules/decks/entities/Deck';
import ICloneDecksDTO from '@modules/decks/dtos/ICloneDecksDTO';

@injectable()
export class CloneDecksUseCase {
  constructor(
    @inject('DecksRepository')
    private decksRepository: IDecksRepository
  ) {}

  async execute({ deck, userId }: ICloneDecksDTO): Promise<Deck> {
    return await this.decksRepository.create({ 
      name: deck.name, 
      parentId: deck.parentId, 
      userId, 
      isPublic: false,
      clonedBy: deck.id
    });
  }
}