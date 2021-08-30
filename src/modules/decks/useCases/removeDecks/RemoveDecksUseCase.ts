import { inject, injectable } from 'tsyringe';

import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import IRemoveDecksDTO from "@modules/decks/dtos/IRemoveDecksDTO";

@injectable()
export class RemoveDecksUseCase {
  constructor(
    @inject('DecksRepository')
    private decksRepository: IDecksRepository
  ) {}

  async execute({ deckId, userId }: IRemoveDecksDTO): Promise<void> {
    await this.decksRepository.remove({ deckId, userId });
  }
}