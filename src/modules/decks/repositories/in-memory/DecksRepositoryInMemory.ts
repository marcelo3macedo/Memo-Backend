import IListDecksDTO from "../../dtos/IListDecksDTO";
import ICreateDecksDTO from "../../dtos/ICreateDecksDTO";
import IIndexDecksDTO from "../../dtos/IIndexDecksDTO";
import IRemoveDecksDTO from "../../dtos/IRemoveDecksDTO";
import Deck from "../../entities/Deck";
import { IDecksRepository } from "../IDecksRepository";
import { AppError } from "@shared/errors/AppError";
import IIndexPathDecksDTO from "@modules/decks/dtos/IIndexPathDecksDTO";
import ICheckSavedDecksDTO from "@modules/decks/dtos/ICheckSavedDecksDTO";
import ICountDecksDTO from "@modules/decks/dtos/ICountDecksDTO";
import IUpdateDecksDTO from "@modules/decks/dtos/IUpdateDecksDTO";

class DecksRepositoryInMemory implements IDecksRepository {
    decks: Deck[] = [];

    async create({ name, parentId, userId, isPublic, path, frequencyId }: ICreateDecksDTO): Promise<Deck> {
        const deck = new Deck();
        Object.assign(deck, {
          name, userId, parentId, isPublic, path, frequencyId
        });

        this.decks.push(deck);

        return deck;
    }

    async list({ userId, isPublic, name, page } : IListDecksDTO): Promise<Deck[]> {
        if (isPublic) {
            return this.decks.filter(d => d.isPublic == isPublic);
        }
        
        return this.decks.filter(d => d.userId === userId);
    }

    async index({ deckId }: IIndexDecksDTO): Promise<Deck> {
        return this.decks.find(d => d.id === deckId)!;
    }

    async remove({ deckId, userId }: IRemoveDecksDTO): Promise<void> {
        const deck = this.decks.find(d => d.userId === userId && d.id === deckId)!

        if (!deck) {
            throw new AppError("Deck not found", 400);
        }

        this.decks.shift()
    }

    async findByPath({ path }: IIndexPathDecksDTO): Promise<Deck> {
        const selection = this.decks.filter(d=> d.path === path);

        if (!selection || (selection.length == 0)) {
            return;
        }

        return selection[0];
    }

    async checkIsSaved({ deckId, userId }: ICheckSavedDecksDTO): Promise<boolean> {
        const selection = this.decks.filter(d=> d.id === deckId && d.userId === userId);

        if (!selection || (selection.length == 0)) {
            return false;
        }

        return true;
    }

    async count({ userId }: ICountDecksDTO): Promise<number> {
        return this.decks.filter(d=> d.userId === userId).length;
    }

    async update(data: IUpdateDecksDTO): Promise<void> {

    }
}

export { DecksRepositoryInMemory }