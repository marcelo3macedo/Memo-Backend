import { getRepository, Repository } from 'typeorm';

import Deck from '../../entities/Deck';
import { IDecksRepository } from '../IDecksRepository';
import IListDecksDTO from "@modules/decks/dtos/IListDecksDTO";
import ICreateDecksDTO from "@modules/decks/dtos/ICreateDecksDTO";
import IIndexDecksDTO from "@modules/decks/dtos/IIndexDecksDTO";
import IFilterDecksDTO from '@modules/decks/dtos/IFilterDecksDTO';
import IRemoveDecksDTO from "@modules/decks/dtos/IRemoveDecksDTO";
import { AppError } from "@shared/errors/AppError";

export class DecksRepository implements IDecksRepository {
  private repository: Repository<Deck>;

  constructor() {
    this.repository = getRepository(Deck);
  }

  async list({ userId }: IListDecksDTO): Promise<Deck[]> {
    return this.repository.createQueryBuilder('decks')
      .loadRelationCountAndMap('decks.cardsCount', 'decks.cards', 'cards')
      .where('decks.active = true')
      .andWhere('decks.userId = :userId')
      .setParameter('userId', userId)
      .getMany();
  }

  async index({ deckId, userId }: IIndexDecksDTO): Promise<Deck> {
    const deck = await this.repository.findOne({ where: { id: deckId, userId: userId }, relations: ['cards'] });
    
    if (!deck) {
      throw new AppError("Deck not found", 400);      
    }      

    return deck;
  }

  async create({ name, userId }: ICreateDecksDTO): Promise<Deck> {
    const user = this.repository.create({
       name,
       userId
    });

    return await this.repository.save(user);
  }

  async remove({ deckId, userId }: IRemoveDecksDTO): Promise<void> {
    const update = await this.repository.update({ id: deckId, userId  }, {
      active: false
    })

    if (update.affected == 0) {
      throw new AppError("Deck not found", 400);
    }
  }

  async filter({ olderThen }:IFilterDecksDTO): Promise<Deck[]> {
    let queryBuilder = this.repository.createQueryBuilder("decks")
      .where("decks.active = :active", { active: true });
      
    if (olderThen) {
      queryBuilder.andWhere("decks.createdAt > :createdAt", { createdAt: olderThen });
    }

    return queryBuilder.getMany();
  }
}