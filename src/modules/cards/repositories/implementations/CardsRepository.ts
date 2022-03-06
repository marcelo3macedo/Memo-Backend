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
import { AppError } from "@shared/errors/AppError";
import { CARD_NOTFOUND, DECK_NOTFOUND } from '@constants/logger';
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
      .where({ id : deckId })
      .cache(`${CACHE_CARDS}:${deckId}`)
      .getMany();
  }

  async create({ deck, title, content, secretContent }: ICreateCardsDTO): Promise<Card> {
    if (!deck) {
      throw new AppError(DECK_NOTFOUND, 400);      
    }    

    const card = this.repository.create({
      title,
      content,
      secretContent,
      deck
    });

    this.cache.remove([ `${CACHE_CARDS}:${deck.id}` ])

    return await this.repository.save(card);
  }

  async index({ deck, cardId }: IIndexCardsDTO): Promise<Card> {
    const card = await this.repository.createQueryBuilder('cards')
      .where({ id: cardId, deck })
      .cache(`${CACHE_CARDS}:${deck.id}`)
      .getOne();
        
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

    this.repository.softDelete(cardId);
    this.cache.remove([ `${CACHE_CARDS}:${card.deckId}` ])
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

    return queryBuilder
      .limit(limit)
      .cache(`${CACHE_CARDS}:${deck.id}`)
      .getMany();
  }

  async count({ deckId }: ICountCardsDTO): Promise<number> {
    if (!deckId) {
      throw new AppError(DECK_NOTFOUND, 400);      
    }

    return await this.repository.count({ deckId })
  }
}