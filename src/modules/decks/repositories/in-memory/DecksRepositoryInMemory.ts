import IListDecksDTO from "../../dtos/IListDecksDTO";
import ICreateDecksDTO from "../../dtos/ICreateDecksDTO";
import IIndexDecksDTO from "../../dtos/IIndexDecksDTO";
import IRemoveDecksDTO from "../../dtos/IRemoveDecksDTO";
import Deck from "../../entities/Deck";
import { IDecksRepository } from "../IDecksRepository";
import { AppError } from "@shared/errors/AppError";
import IFilterDecksDTO from "@modules/decks/dtos/IFilterDecksDTO";

class DecksRepositoryInMemory implements IDecksRepository {
    decks: Deck[] = [];

    async list({ userId } : IListDecksDTO): Promise<Deck[]> {
        return this.decks.filter(d => d.userId === userId);
    }

    async index({ deckId, userId }: IIndexDecksDTO): Promise<Deck> {
        return this.decks.find(d => d.userId === userId && d.id === deckId)!;
    }

    async create({ name, userId }: ICreateDecksDTO): Promise<void> {
        const deck = new Deck();

        Object.assign(deck, {
          name, userId  
        });

        this.decks.push(deck);
    }

    async remove({ deckId, userId }: IRemoveDecksDTO): Promise<void> {
        const deck = this.decks.find(d => d.userId === userId && d.id === deckId)!

        if (!deck) {
            throw new AppError("Deck not found", 400);
        }

        this.decks.unshift(deck)
        deck.active = false
        this.decks.push(deck)        
    }

    async filter({ olderThen }:IFilterDecksDTO): Promise<Deck[]>{
        const decks = this.decks.filter(d => d.active === true)!;
        
        if (olderThen) {
            decks.filter(d=> d.createdAt > new Date(olderThen));
        }

        return decks;
    }
}

export { DecksRepositoryInMemory }