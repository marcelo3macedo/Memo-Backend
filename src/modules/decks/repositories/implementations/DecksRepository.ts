import { getRepository, Repository } from 'typeorm';

import pagination from '@config/pagination';
import { CACHE_DECKS, CACHE_PUBLIC_DECKS } from '@constants/cacheKeys';
import Deck from '@modules/decks/entities/Deck';
import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';

export class DecksRepository implements IDecksRepository {
  private repository: Repository<Deck>;
  private cache: any;

  constructor() {
    this.repository = getRepository(Deck);
    this.cache = this.repository.manager.connection.queryResultCache;
  }

  async list({ userId, isPublic, name, page=0 }): Promise<Deck[]> {
    const offset = page * pagination.limit
    const repository = this.repository.createQueryBuilder('decks')
      .leftJoinAndSelect("decks.frequency", "frequency")
      .leftJoinAndSelect("decks.category", "categories")
      .leftJoinAndSelect("decks.theme", "themes")

    isPublic ?
      repository.where('decks.isPublic = :isPublic')
        .setParameter('isPublic', isPublic)
        .cache(CACHE_PUBLIC_DECKS)
      :
      repository.where('decks.userId = :userId')
        .setParameter('userId', userId)
        .cache(`${CACHE_DECKS}:${userId}`);
        
    if (name) {
      repository.andWhere("decks.name LIKE :name", { name:`%${name}%` })
    }

    repository.limit(pagination.limit).offset(offset)    
    return repository.getMany();
  }

  async index({ deckId }): Promise<Deck> {
    return this.repository.createQueryBuilder('decks')
      .leftJoinAndSelect("decks.cards", "cards")
      .where({ id: deckId })    
      .cache(`${CACHE_DECKS}:${deckId}`).getOne();
  }

  async findByPath({ path }): Promise<Deck> {
    return this.repository.createQueryBuilder('decks')
      .where({ path })
      .cache(`${CACHE_DECKS}:${path}`)
      .getOne();
  }

  async checkIsSaved({ deckId, userId }): Promise<boolean> {
    const savedCount = await this.repository.createQueryBuilder('decks')
      .where({ userId, clonedBy: deckId })
      .cache(`${CACHE_DECKS}:${userId}`)
      .getCount();

    return (savedCount > 0);
  }

  async count({ userId }): Promise<number> {
    return this.repository.count({ userId })
  }

  async create({ name, description, path, userId, parentId, frequencyId, isPublic, clonedBy, categoryId, themeId }): Promise<Deck> {
    const deck = this.repository.create({
       name,
       description,
       path,
       userId,
       parentId,
       frequencyId,
       categoryId,
       isPublic,
       clonedBy,
       themeId
    });

    await this.repository.save(deck);
    this.cache.remove([ `${CACHE_DECKS}:${userId}` ])
    
    return deck;
  }

  async remove({ deckId, userId }): Promise<void> {
    this.repository.softDelete({ userId: userId, id: deckId });
    this.cache.remove([ 
      `${CACHE_DECKS}:${userId}`, 
      `${CACHE_DECKS}:${deckId}` 
    ])
  }

  async update({ deckId, name, description, frequencyId, userId }): Promise<void> {
    const deck = {
       name,
       description,
       frequencyId
     }

     this.repository.update({ id: deckId }, deck)
     this.cache.remove([ 
      `${CACHE_DECKS}:${userId}`, 
      `${CACHE_DECKS}:${deckId}` 
    ])
  } 
}