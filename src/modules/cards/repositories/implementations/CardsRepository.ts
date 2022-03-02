import { getRepository, Repository } from 'typeorm';

import IListCardsDTO from "@modules/cards/dtos/IListCardsDTO";
import ICreateCardsDTO from "@modules/cards/dtos/ICreateCardsDTO";
import IIndexCardsDTO from "@modules/cards/dtos/IIndexCardsDTO";
import IFilterCardsDTO from "@modules/cards/dtos/IFilterCardsDTO";
import IUpdateCardsDTO from "@modules/cards/dtos/IUpdateCardsDTO";
import IRemoveCardsDTO from "@modules/cards/dtos/IRemoveCardsDTO";
import Card from '@modules/cards/entities/Card';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import { AppError } from "@shared/errors/AppError";
import ICountCardsDTO from '@modules/cards/dtos/ICountCardsDTO';
import CacheManager from '@lib/CacheManager';
import { DECK_CARDS } from '@constants/cacheKeys';
import { CARD_NOTFOUND, DECK_NOTFOUND } from '@constants/logger';

export class CardsRepository implements ICardsRepository {
  private repository: Repository<Card>;

  constructor() {
    this.repository = getRepository(Card);
  }

  async list({ deckId }: IListCardsDTO): Promise<Card[]> {
    return this.repository.find({ where: { deck: { id : deckId } }});
  }

  async create({ deck, title, content, secretContent }: ICreateCardsDTO): Promise<Card> {
    if (!deck) {
      throw new AppError(DECK_NOTFOUND, 400);      
    }    

    CacheManager.hdel(DECK_CARDS, deck.id)
    
    const card = this.repository.create({
      title,
      content,
      secretContent,
      deck
    });

    return await this.repository.save(card);
  }

  async index({ deck, cardId }: IIndexCardsDTO): Promise<Card> {
    const card = await this.repository.findOne({ where: { id: cardId, deck } });
    
    if (!card) {
      throw new AppError(CARD_NOTFOUND, 400);      
    }   

    return card;
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

  async remove({ cardId }: IRemoveCardsDTO): Promise<void> {
    const card = await this.repository.findOne({ where: { id: cardId } });
    
    if (!card) {
      throw new AppError(CARD_NOTFOUND, 400);      
    }

    CacheManager.hdel(DECK_CARDS, card.deckId)

    this.repository.softDelete(cardId);
  }

  async filter({ deck, cards, limit }:IFilterCardsDTO): Promise<Card[]> {
    let deckIds = deck.children.map(d => { return d.id });
    deckIds.push(deck.id);

    if (deck.clonedBy) {
      deckIds.push(deck.clonedBy);
    }

    let queryBuilder = this.repository.createQueryBuilder("cards")
      .where("cards.deck.id IN (:...deckIds)", { deckIds });

    if (cards && cards.length > 0) {
      let cardsIds = cards.map(c => { return c.id }).toString();
      queryBuilder.andWhere("cards.id NOT IN (:...cards)", { cards: cardsIds });
    }

    return queryBuilder.limit(limit).getMany();
  }

  async count({ deckId }: ICountCardsDTO): Promise<number> {
    if (!deckId) {
      throw new AppError(DECK_NOTFOUND, 400);      
    }

    const cached = await CacheManager.hget(DECK_CARDS, deckId)
    
    if (cached) {
      return cached
    }

    const data = await this.repository.count({ deckId })
    
    CacheManager.hset(DECK_CARDS, deckId, data)

    return data
  }
}