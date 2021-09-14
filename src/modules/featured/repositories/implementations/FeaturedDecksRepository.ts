import { getRepository, Repository } from 'typeorm';

import { IFeaturedDecksRepository } from '../IFeaturedDecksRepository';
import FeaturedDecks from '@modules/featured/entities/FeaturedDecks';
import IListFeaturedDecks from '@modules/featured/dtos/IListFeaturedDecks';

export class FeaturedDecksRepository implements IFeaturedDecksRepository {
  private repository: Repository<FeaturedDecks>;

  constructor() {
    this.repository = getRepository(FeaturedDecks);
  }

  async all(): Promise<FeaturedDecks[]> {
    return this.repository.find({ where: { active: true }});
  }

  async filter(data: IListFeaturedDecks): Promise<FeaturedDecks[]> {
    return this.repository.find({ where: { active: true, type: data.type }, relations: ['deck']});
  }
}