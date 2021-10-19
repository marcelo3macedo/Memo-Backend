import { getRepository, Repository } from 'typeorm';

import { IFeaturedDecksRepository } from '../IFeaturedDecksRepository';
import FeaturedDecks from '@modules/featured/entities/FeaturedDecks';
import IListFeaturedDecks from '@modules/featured/dtos/IListFeaturedDecks';
import ICreateFeaturedDecks from '@modules/featured/dtos/ICreateFeaturedDecks';

export class FeaturedDecksRepository implements IFeaturedDecksRepository {
  private repository: Repository<FeaturedDecks>;

  constructor() {
    this.repository = getRepository(FeaturedDecks);
  }

  async all(): Promise<FeaturedDecks[]> {
    return this.repository.find({ where: { active: true }, relations: ['deck']});
  }

  async filter(data: IListFeaturedDecks): Promise<FeaturedDecks[]> {
    return this.repository.find({ where: { active: true, type: data.type }, relations: ['deck']});
  }

  async create(data: ICreateFeaturedDecks): Promise<void> {
    const featuredDeck = this.repository.create({
      deck: data.deck,
      active: true
    });

    await this.repository.save(featuredDeck);
  }
}