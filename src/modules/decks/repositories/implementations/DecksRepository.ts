import { getRepository, Repository } from 'typeorm';
import Deck from '../../entities/Deck';
import { IDecksRepository } from '../IDecksRepository';
import IListDecksDTO from "@modules/decks/dtos/IListDecksDTO";
import ICreateDecksDTO from "@modules/decks/dtos/ICreateDecksDTO";
import IIndexDecksDTO from "@modules/decks/dtos/IIndexDecksDTO";
import IRemoveDecksDTO from "@modules/decks/dtos/IRemoveDecksDTO";
import { AppError } from '@shared/errors/AppError';
import pagination from '@config/pagination';
import CacheManager from 'lib/CacheManager';
import ICountDecksDTO from '@modules/decks/dtos/ICountDecksDTO';
import { USER_DECKS } from 'constants/cacheKeys';

export class DecksRepository implements IDecksRepository {
  private repository: Repository<Deck>;

  constructor() {
    this.repository = getRepository(Deck);
  }

  async create({ name, userId, parentId, frequencyId, isPublic, clonedBy, categoryId, themeId }: ICreateDecksDTO): Promise<Deck> {
    CacheManager.hdel(USER_DECKS, userId)

    if (!isPublic && clonedBy) {
      const deckExists = await this.repository.findOne({ where: { userId, isPublic, clonedBy } });

      if (deckExists) return deckExists;
    }

    const deck = this.repository.create({
       name,
       userId,
       parentId,
       frequencyId,
       categoryId,
       isPublic,
       clonedBy,
       themeId
    });

    deck.owner = true;

    return await this.repository.save(deck);
  }

  async remove({ deckId, userId }: IRemoveDecksDTO): Promise<void> {
    CacheManager.hdel(USER_DECKS, userId)

    this.repository.softDelete({ userId: userId, id: deckId });
  }

  async list({ userId, isPublic, name, page=0 }: IListDecksDTO): Promise<Deck[]> {
    const offset = page * pagination.limit
    const repository = this.repository.createQueryBuilder('decks')
      .loadRelationCountAndMap('decks.childrenCount', 'decks.children', 'children')
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

    if (isPublic) {
      repository.cache(CacheManager.getId(repository), CacheManager.getHighTtl());
    }    
    
    return repository.getMany();
  }

  async personal({ userId, name, page=0 }): Promise<Deck[]> {
    const offset = page * pagination.limit
    const repository = this.repository.createQueryBuilder('decks')
      .loadRelationCountAndMap('decks.childrenCount', 'decks.children', 'children')
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

  async index({ deckId, userId, isPublic }: IIndexDecksDTO): Promise<Deck> {
    const deck = await this.repository.findOne({ where: { id: deckId }, relations: ['cards'] });
    
    if (!deck) {
      throw new AppError("Deck not found", 400);      
    }

    const parentId = deck.clonedBy ? deck.clonedBy : deck.id;

    deck.children = await this.repository.createQueryBuilder('decks')
      .loadRelationCountAndMap('decks.cardsCount', 'decks.cards', 'cards')
      .where('decks.parentId = :parentId')
      .setParameter('parentId', parentId)
      .getMany();

    deck.owner = userId === deck.userId;

    return deck;
  }

  async count({ userId }: ICountDecksDTO): Promise<number> {
    if (!userId) {
      throw new AppError("User not found", 400);      
    }

    const cached = await CacheManager.hget(USER_DECKS, userId)
    
    if (cached) {
      return cached
    }

    const data = await this.repository.count({ userId })
    
    CacheManager.hset(USER_DECKS, userId, data)

    return data
  }
}