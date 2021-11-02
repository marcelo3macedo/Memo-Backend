import { getRepository, Repository } from 'typeorm';

import { IFeaturedDecksRepository } from '../IFeaturedDecksRepository';
import FeaturedDecks from '@modules/featured/entities/FeaturedDecks';

export class FeaturedDecksRepository implements IFeaturedDecksRepository {
  private repository: Repository<FeaturedDecks>;

  constructor() {
    this.repository = getRepository(FeaturedDecks);
  }

  async all(): Promise<FeaturedDecks[]> {
    return this.repository.find({ relations: ['deck']});
  }

  async filter({ type }): Promise<FeaturedDecks[]> {
    return this.repository.find({ where: { type }, relations: ['deck']});
  }

  async create({ deck }): Promise<void> {
    const featuredDeck = this.repository.create({
      deck: deck
    });

    await this.repository.save(featuredDeck);
  }

  async remove({ featuredDeckId }): Promise<void> {
    await this.repository.softDelete(featuredDeckId);
  }
}