import Card from "../../entities/Card";
import IListCardsDTO from "../../dtos/IListCardsDTO";
import ICreateCardsDTO from "../../dtos/ICreateCardsDTO";
import IIndexCardsDTO from "../../dtos/IIndexCardsDTO";
import IUpdateCardsDTO from "../../dtos/IUpdateCardsDTO";
import IRemoveCardsDTO from "../../dtos/IRemoveCardsDTO";
import IFilterCardsDTO from "../../dtos/IFilterCardsDTO";
import ICardsRepository from "../ICardsRepository";

import { AppError } from "@shared/errors/AppError";

class CardsRepositoryInMemory implements ICardsRepository {
    cards: Card[] = [];

    async list({ deckId }: IListCardsDTO): Promise<Card[]> {
        return this.cards.filter(d => d.deck.id === deckId);
    }

    async create({ deck, title, content, secretContent }: ICreateCardsDTO): Promise<void> {
        if (!deck) {
            throw new AppError("Deck not found", 400);      
        }
        
        const card = new Card();

        Object.assign(card, {
            title,
            content,
            secretContent,
            deck
        });

        this.cards.push(card);
    }

    async index({ deck, cardId }:IIndexCardsDTO): Promise<Card> {
        return this.cards.find(d => d.id == cardId)!;
    }

    async update({ cardId, title, content, secretContent }: IUpdateCardsDTO): Promise<void> {
        const card = this.cards.find(d => d.id === cardId)!

        this.cards.unshift(card)
        
        card.title = title;
        card.content = content;
        card.secretContent = secretContent;

        this.cards.push(card);
    }

    async remove({ cardId }: IRemoveCardsDTO): Promise<void> {
        const card = this.cards.find(d => d.id === cardId)!

        if (!card) {
            throw new AppError("Card not found", 400);
        }

        this.cards.unshift(card)
        card.active = false
        this.cards.push(card)    
    }

    async filter({ deckId, cards, limit }:IFilterCardsDTO): Promise<Card[]>{
        const cardsSelected = this.cards.filter(d => d.deck.id === deckId && d.active === true)!;
        
        if (cards && cards.length > 0) {
            return cardsSelected.filter(c=> c.id in (cards));
        }

        return cardsSelected;
    }

}

export { CardsRepositoryInMemory }