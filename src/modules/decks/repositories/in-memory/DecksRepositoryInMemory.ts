import IListDecksDTO from "../../dtos/IListDecksDTO";
import ICreateDecksDTO from "../../dtos/ICreateDecksDTO";
import IIndexDecksDTO from "../../dtos/IIndexDecksDTO";
import IRemoveDecksDTO from "../../dtos/IRemoveDecksDTO";
import Deck from "../../entities/Deck";
import { IDecksRepository } from "../IDecksRepository";
import { AppError } from "@shared/errors/AppError";

class DecksRepositoryInMemory implements IDecksRepository {
    decks: Deck[] = [];

    async create({ name, parentId, userId, isPublic }: ICreateDecksDTO): Promise<Deck> {
        const deck = new Deck();
        Object.assign(deck, {
          name, userId, parentId, isPublic
        });

        this.decks.push(deck);

        return deck;
    }

    async list({ userId } : IListDecksDTO): Promise<Deck[]> {
        return this.decks.filter(d => d.userId === userId);
    }

    async index({ deckId, userId, isPublic }: IIndexDecksDTO): Promise<Deck> {
        if (!isPublic) {
            return this.decks.find(d => d.userId === userId && d.id === deckId)!;
        }
        
        return this.decks.find(d => d.id === deckId)!;
    }

    async remove({ deckId, userId }: IRemoveDecksDTO): Promise<void> {
        const deck = this.decks.find(d => d.userId === userId && d.id === deckId)!

        if (!deck) {
            throw new AppError("Deck not found", 400);
        }

        this.decks.unshift(deck)     
    }
}

export { DecksRepositoryInMemory }