import { getRepository, Repository } from 'typeorm';

import pagination from '@config/pagination';
import { CACHE_DECKS, CACHE_PUBLIC_DECKS } from '@constants/cacheKeys';
import Deck from '@modules/decks/entities/Deck';
import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import IListDecksDTO from "@modules/decks/dtos/IListDecksDTO";
import ICreateDecksDTO from "@modules/decks/dtos/ICreateDecksDTO";
import IIndexDecksDTO from "@modules/decks/dtos/IIndexDecksDTO";
import IRemoveDecksDTO from "@modules/decks/dtos/IRemoveDecksDTO";
import ICountDecksDTO from '@modules/decks/dtos/ICountDecksDTO';
import IUpdateDecksDTO from '@modules/decks/dtos/IUpdateDecksDTO';
import IIndexPathDecksDTO from '@modules/decks/dtos/IIndexPathDecksDTO';
import ICheckSavedDecksDTO from '@modules/decks/dtos/ICheckSavedDecksDTO';

export class DecksRepository implements IDecksRepository {
  private repository: Repository<Deck>;
  private cache: any;

  constructor() {
    this.repository = getRepository(Deck);
    this.cache = this.repository.manager.connection.queryResultCache;
  }

  async list({ userId, isPublic, name, page=0 }: IListDecksDTO): Promise<Deck[]> {
    const offset = page * pagination.limit
    const repository = this.repository.createQueryBuilder('decks')
      .leftJoinAndSelect("decks.frequency", "frequency")
      .leftJoinAndSelect("decks.category", "categories")
      .leftJoinAndSelect("decks.theme", "themes")
      .where('decks.parentId IS NULL')
      .andWhere('decks.isPublic = :isPublic')
      .setParameter('isPublic', isPublic)
    
    if (!isPublic) {
      repository.orWhere('decks.userId = :userId')
        .setParameter('userId', userId);
    }
    
    if (name) {
      repository.andWhere("decks.name ilike :name", { name:`%${name}%` })
    }

    repository.limit(pagination.limit).offset(offset)
    
    isPublic ? 
      repository.cache(CACHE_PUBLIC_DECKS) :
      repository.cache(`${CACHE_DECKS}:${userId}`)
    
    return repository.getMany();
  }

  async create({ name, description, path, userId, parentId, frequencyId, isPublic, clonedBy, categoryId, themeId }: ICreateDecksDTO): Promise<Deck> {
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

    deck.isSaved = true;
    this.cache.remove([ `${CACHE_DECKS}:${userId}` ])

    return await this.repository.save(deck);
  }

  async remove({ deckId, userId }: IRemoveDecksDTO): Promise<void> {
    this.repository.softDelete({ userId: userId, id: deckId });
    this.cache.remove([ 
      `${CACHE_DECKS}:${userId}`, 
      `${CACHE_DECKS}:${deckId}` 
    ])
  }

  async update({ deckId, name, description, frequencyId, userId }: IUpdateDecksDTO): Promise<void> {
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

  async personal({ userId, name, page=0 }): Promise<Deck[]> {
    const offset = page * pagination.limit
    const repository = this.repository.createQueryBuilder('decks')
      .leftJoinAndSelect("decks.frequency", "frequency")
      .leftJoinAndSelect("decks.category", "categories")
      .leftJoinAndSelect("decks.theme", "themes")
      .where('decks.parentId IS NULL')
      .andWhere('decks.userId = :userId')
      .setParameter('userId', userId);

    if (name) {
      repository.andWhere("decks.name ilike :name", { name:`%${name}%` })
    }
    
    return repository.limit(pagination.limit).offset(offset).getMany();
  }

  async index({ deckId }: IIndexDecksDTO): Promise<Deck> {
    return this.repository.createQueryBuilder('decks')
      .leftJoinAndSelect("decks.cards", "cards")
      .where({ id: deckId })    
      .cache(`${CACHE_DECKS}:${deckId}`).getOne();
  }

  async indexByPath({ path }: IIndexPathDecksDTO): Promise<Deck> {
    return this.repository.createQueryBuilder('decks')
      .where({ path })
      .cache(`${CACHE_DECKS}:${path}`)
      .getOne();
  }

  async count({ userId }: ICountDecksDTO): Promise<number> {
    return await this.repository.count({ userId })
  }

  async checkIsSaved({ deckId, userId }: ICheckSavedDecksDTO): Promise<boolean> {
    const savedCount = await this.repository.createQueryBuilder('decks')
      .where({ userId, clonedBy: deckId })
      .cache(`${CACHE_DECKS}:${userId}`)
      .getCount()

    return savedCount > 0
  }
}