import { v4 as uuid } from "uuid";
import { DecksRepositoryInMemory } from "@modules/decks/repositories/in-memory/DecksRepositoryInMemory";
import { CreateDecksUseCase } from "../createDecks/CreateDecksUseCase";
import { IndexDecksUseCase } from "./IndexDecksUseCase";
import { ListDecksUseCase } from "../listDecks/ListDecksUseCase";
import Deck from "@modules/decks/entities/Deck";

let decksRepositoryInMemory: DecksRepositoryInMemory;
let createDecksUseCase: CreateDecksUseCase;
let indexDecksUseCase: IndexDecksUseCase;
let listDecksUseCase: ListDecksUseCase;

describe("Indexes Decks", () => {
    beforeEach(() => {
        decksRepositoryInMemory = new DecksRepositoryInMemory();
        createDecksUseCase = new CreateDecksUseCase(decksRepositoryInMemory);
        listDecksUseCase = new ListDecksUseCase(decksRepositoryInMemory);
        indexDecksUseCase = new IndexDecksUseCase(decksRepositoryInMemory);
    });

    it("Should be search for a deck", async () => {
        const userId = uuid();
        await createDecksUseCase.execute({ name: 'test', userId: userId, parentId: null, isPublic: true, path: 'teste', frequencyId: "1" })

        const decks = await listDecksUseCase.execute({ userId, name: null, isPublic: true, page: 0 });
        if (!decks || decks.length === 0) {
            return;
        }

        const { id: deckId } = decks[0];
        const deck = await indexDecksUseCase.execute({ deckId, userId });
        
        expect(deck).toBeInstanceOf(Deck);
    });

    it("Should be search for a deck by path", async () => {
        const userId = uuid();

        await createDecksUseCase.execute({ name: 'test', userId: userId, parentId: null, isPublic: true, path: 'teste', frequencyId: "1" });
        const deck = await indexDecksUseCase.execute({ path: 'teste' });
        
        expect(deck).toBeInstanceOf(Deck);
    });

    it("Should not search for a private deck from another user", async () => {
        const userId = uuid();
        const anotherUserId = uuid();
        await createDecksUseCase.execute({ name: 'test', userId: anotherUserId, parentId: null, isPublic: false, path: 'teste', frequencyId: "1" })

        const decks = await listDecksUseCase.execute({ userId, name: null, isPublic: false, page: 0 });
        if (!decks || decks.length === 0) {
            return;
        }

        const { id: deckId } = decks[0];
        const deck = await indexDecksUseCase.execute({ deckId, userId });
        
        expect(deck).toBeInstanceOf(null);
    });
});