import { getRepository, Repository } from 'typeorm';

import Card from '../../entities/Card';
import ICardsRepository from '../ICardsRepository';
import IListCardsDTO from "@modules/cards/dtos/IListCardsDTO";
import ICreateCardsDTO from "@modules/cards/dtos/ICreateCardsDTO";
import IIndexCardsDTO from "@modules/cards/dtos/IIndexCardsDTO";
import IFilterCardsDTO from "@modules/cards/dtos/IFilterCardsDTO";
import IUpdateCardsDTO from "@modules/cards/dtos/IUpdateCardsDTO";
import IRemoveCardsDTO from "@modules/cards/dtos/IRemoveCardsDTO";
import { AppError } from "@shared/errors/AppError";

export class CardsRepository implements ICardsRepository {
  private repository: Repository<Card>;

  constructor() {
    this.repository = getRepository(Card);
  }

  async list({ deckId }: IListCardsDTO): Promise<Card[]> {
    return this.repository.find({ where: { active: true, deck: { id : deckId } }});
  }

  async create({ deck, content, secretContent }: ICreateCardsDTO): Promise<Card> {
    if (!deck) {
      throw new AppError("Deck not found", 400);      
    }    

    const card = this.repository.create({
      content,
      secretContent,
      deck
    });

    return await this.repository.save(card);
  }

  async index({ deck, cardId }: IIndexCardsDTO): Promise<Card> {
    const card = await this.repository.findOne({ where: { id: cardId, deck, active:true } });
    
    if (!card) {
      throw new AppError("Card not found", 400);      
    }   

    return card;
  }

  async update({ cardId, content, secretContent }: IUpdateCardsDTO): Promise<void> {
    const card = {
      content,
      secretContent
    }

    this.repository.update({ id:cardId }, card);
  }

  async remove({ cardId }: IRemoveCardsDTO): Promise<void> {
    const update = await this.repository.update({ id: cardId, active:true  }, {
      active: false
    })

    if (update.affected == 0) {
      throw new AppError("Card not found", 400);
    }
  }

  async filter({ deckId, cards, limit }:IFilterCardsDTO): Promise<Card[]> {
    let queryBuilder = this.repository.createQueryBuilder("cards")
      .where("cards.active = :active", { active: true })
      .andWhere("cards.deck.id = :deckId", { deckId })
      .limit(limit);

    if (cards && cards.length > 0) {
      let cardsIds = cards.map(c => { return c.id }).toString();
      queryBuilder.andWhere("cards.id NOT IN (:cards)", { cards: cardsIds });
    }

    return queryBuilder.getMany();
  }
}