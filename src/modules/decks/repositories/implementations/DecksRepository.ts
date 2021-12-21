import { getRepository, ILike, In, Repository } from 'typeorm';
import Deck from '../../entities/Deck';
import { IDecksRepository } from '../IDecksRepository';
import IListDecksDTO from "@modules/decks/dtos/IListDecksDTO";
import ICreateDecksDTO from "@modules/decks/dtos/ICreateDecksDTO";
import IIndexDecksDTO from "@modules/decks/dtos/IIndexDecksDTO";
import IRemoveDecksDTO from "@modules/decks/dtos/IRemoveDecksDTO";
import { AppError } from '@shared/errors/AppError';

export class DecksRepository implements IDecksRepository {
  private repository: Repository<Deck>;

  constructor() {
    this.repository = getRepository(Deck);
  }

  async create({ name, userId, parentId, isPublic, clonedBy }: ICreateDecksDTO): Promise<Deck> {
    if (!isPublic && clonedBy) {
      const deckExists = await this.repository.findOne({ where: { userId, isPublic, clonedBy } });

      if (deckExists) return deckExists;
    }

    const deck = this.repository.create({
       name,
       userId,
       parentId,
       isPublic,
       clonedBy
    });

    deck.owner = true;

    return await this.repository.save(deck);
  }

  async remove({ deckId, userId }: IRemoveDecksDTO): Promise<void> {
    this.repository.softDelete({ userId: userId, id: deckId });
  }

  async list({ userId, isPublic, name }: IListDecksDTO): Promise<Deck[]> {
    const repository = this.repository.createQueryBuilder('decks')
      .loadRelationCountAndMap('decks.childrenCount', 'decks.children', 'children')
      .where('decks.parentId IS NULL')
      .andWhere('decks.isPublic = :isPublic')
      .setParameter('isPublic', isPublic);
    
    if (!isPublic) {
      repository.orWhere('decks.userId = :userId')
        .setParameter('userId', userId);
    }
    
    if (name) {
      repository.andWhere("decks.name ilike :name", { name:`%${name}%` })
    }

    return repository.getMany();
  }

  async index({ deckId, userId, isPublic }: IIndexDecksDTO): Promise<Deck> {
    const deck = isPublic ? 
      await this.repository.findOne({ where: { id: deckId }, relations: ['cards'] }) :
      await this.repository.findOne({ where: { id: deckId, userId: userId }, relations: ['cards'] });
    
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
}