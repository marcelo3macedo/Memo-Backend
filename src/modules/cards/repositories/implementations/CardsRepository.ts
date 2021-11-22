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
      throw new AppError("Deck not found", 400);      
    }    

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
      throw new AppError("Card not found", 400);      
    }   

    return card;
  }

  async update({ cardId, title, content, secretContent }: IUpdateCardsDTO): Promise<void> {
    const card = {
      title,
      content,
      secretContent
    }

    this.repository.update({ id:cardId }, card);
  }

  async remove({ cardId }: IRemoveCardsDTO): Promise<void> {
    this.repository.softDelete(cardId);
  }

  async filter({ deck, cards, limit }:IFilterCardsDTO): Promise<Card[]> {
    let deckIds = deck.children.map(d => { return d.id });

    let queryBuilder = this.repository.createQueryBuilder("cards")
      .where("cards.deck.id IN (:...deckIds)", { deckIds });

    if (cards && cards.length > 0) {
      let cardsIds = cards.map(c => { return c.id }).toString();
      queryBuilder.andWhere("cards.id NOT IN (:...cards)", { cards: cardsIds });
    }

    return queryBuilder.limit(limit).getMany();
  }
}