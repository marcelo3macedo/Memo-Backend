import { getRepository, Repository } from 'typeorm';

import IListCardsDTO from "@modules/cards/dtos/IListCardsDTO";
import ICreateCardsDTO from "@modules/cards/dtos/ICreateCardsDTO";
import IIndexCardsDTO from "@modules/cards/dtos/IIndexCardsDTO";
import IFilterCardsDTO from "@modules/cards/dtos/IFilterCardsDTO";
import IUpdateCardsDTO from "@modules/cards/dtos/IUpdateCardsDTO";
import IRemoveCardsDTO from "@modules/cards/dtos/IRemoveCardsDTO";
import ICountCardsDTO from '@modules/cards/dtos/ICountCardsDTO';
import Card from '@modules/cards/entities/Card';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import { CACHE_CARDS } from '@constants/cacheKeys';

export class CardsRepository implements ICardsRepository {
  private repository: Repository<Card>;
  private cache:any;

  constructor() {
    this.repository = getRepository(Card);
    this.cache = this.repository.manager.connection.queryResultCache;
  }

  async list({ deckId }: IListCardsDTO): Promise<Card[]> {
    return this.repository.createQueryBuilder('cards')
      .where({ deckId })
      .cache(`${CACHE_CARDS}:${deckId}`)
      .getMany();
  }

  async create({ deck, title, content, secretContent }: ICreateCardsDTO): Promise<Card> {
    const card = this.repository.create({
      title,
      content,
      secretContent,
      deck
    });

    this.cache.remove([ `${CACHE_CARDS}:${deck.id}` ])
    return this.repository.save(card);
  }

  async index({ cardId }: IIndexCardsDTO): Promise<Card> {
    return this.repository.createQueryBuilder('cards')
      .where({ id: cardId })
      .getOne();
  }

  async update({ cardId, title, content, secretContent, difficultyFactor=0 }: IUpdateCardsDTO): Promise<void> {
    const card = {
      title,
      content,
      secretContent,
      difficultyFactor
    }

    this.repository.update({ id:cardId }, card);
  }

  async remove({ cardId, deckId }: IRemoveCardsDTO): Promise<void> {
    this.repository.softDelete(cardId);
    this.cache.remove([ `${CACHE_CARDS}:${deckId}` ])
  }
  
  async count({ deckId }: ICountCardsDTO): Promise<number> {
    return this.repository.count({ deckId })
  }

  async filter({ deck, cards, limit }:IFilterCardsDTO): Promise<Card[]> {
    const queryBuilder = this.repository.createQueryBuilder("cards")
      .where("cards.deck.id = :deckId", { deckId: deck.id });

    if (cards && cards.length > 0) {
      let cardsIds = cards.map(c => { return c.id }).toString();
      queryBuilder.andWhere("cards.id NOT IN (:...cards)", { cards: cardsIds });
    }

    return queryBuilder
      .limit(limit)
      .cache(`${CACHE_CARDS}:${deck.id}`)
      .getMany();
  }
}