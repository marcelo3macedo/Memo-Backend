import Card from "@modules/cards/entities/Card";
import ICardsRepository from "@modules/cards/repositories/ICardsRepository";
import { AppError } from "@shared/errors/AppError";

class CardsRepositoryInMemory implements ICardsRepository {
    cards: Card[] = [];

    async list({ deckId }): Promise<Card[]> {
        return this.cards.filter(d => d.deck.id === deckId);
    }

    async create({ deck, title, content, secretContent }): Promise<Card> {
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

        return card;
    }

    async index({ cardId }): Promise<Card> {
        return this.cards.find(d => d.id == cardId)!;
    }

    async update({ cardId, title, content, secretContent }): Promise<void> {
        const card = this.cards.find(d => d.id === cardId)!;

        this.cards.unshift(card);
        
        card.title = title;
        card.content = content;
        card.secretContent = secretContent;

        this.cards.push(card);
    }

    async remove({ cardId }): Promise<void> {
        const card = this.cards.find(d => d.id === cardId)!

        if (!card) {
            throw new AppError("Card not found", 400);
        }

        this.cards.shift();
    }

    async filter({ deck, cards, limit }): Promise<Card[]>{
        const cardsSelected = this.cards.filter(d => d.deck.id === deck.id)!;
        
        if (cards && cards.length > 0) {
            return cardsSelected.filter(c=> c.id in (cards));
        }

        return cardsSelected;
    }

    async count({ deckId }): Promise<number> {
        return this.cards.filter(c => c.deckId === deckId).length;
    }
}

export { CardsRepositoryInMemory }