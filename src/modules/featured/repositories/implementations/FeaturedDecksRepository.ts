import { getRepository, Repository } from 'typeorm';

import { IFeaturedDecksRepository } from '../IFeaturedDecksRepository';
import FeaturedDecks from '@modules/featured/entities/FeaturedDecks';
import { CACHE_FEATURED_DECKS } from '@constants/cacheKeys';

export class FeaturedDecksRepository implements IFeaturedDecksRepository {
  private repository: Repository<FeaturedDecks>;
  private cache: any;

  constructor() {
    this.repository = getRepository(FeaturedDecks);
    this.cache = this.repository.manager.connection.queryResultCache;
  }

  async all(): Promise<FeaturedDecks[]> {
    return this.repository.createQueryBuilder('featured')
      .leftJoinAndSelect("featured.deck", "decks")
      .cache(CACHE_FEATURED_DECKS)
      .getMany()
  }

  async filter({ type }): Promise<FeaturedDecks[]> {
    return this.repository.createQueryBuilder('featured')
      .leftJoinAndSelect("featured.deck", "decks")
      .where({ type })
      .cache(CACHE_FEATURED_DECKS)
      .getMany()
  }

  async create({ deck }): Promise<void> {
    const featuredDeck = this.repository.create({
      deck: deck
    });

    await this.repository.save(featuredDeck);
    this.cache.remove([ CACHE_FEATURED_DECKS ])
  }

  async remove({ featuredDeckId }): Promise<void> {
    await this.repository.softDelete(featuredDeckId);
    this.cache.remove([ CACHE_FEATURED_DECKS ])
  }
}