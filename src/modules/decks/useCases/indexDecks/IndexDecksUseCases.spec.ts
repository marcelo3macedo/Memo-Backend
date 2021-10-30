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
        await createDecksUseCase.execute({ name: 'test', userId: userId, parentId: null, isPublic: false })

        const decks = await listDecksUseCase.execute({ userId, name: null, isPublic: false })
        const deckId = decks[0]["id"]

        const deck = await indexDecksUseCase.execute({ deckId, userId })
        
        expect(deck).toBeInstanceOf(Deck);
    });
});