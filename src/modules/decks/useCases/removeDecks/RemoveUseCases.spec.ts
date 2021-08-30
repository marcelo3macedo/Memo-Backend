import { v4 as uuid } from "uuid";
import { DecksRepositoryInMemory } from "@modules/decks/repositories/in-memory/DecksRepositoryInMemory";
import { RemoveDecksUseCase } from "./RemoveDecksUseCase";
import { CreateDecksUseCase } from "../createDecks/CreateDecksUseCase";
import { ListDecksUseCase } from "../listDecks/ListDecksUseCase";
import { IndexDecksUseCase } from "../indexDecks/IndexDecksUseCase";

let decksRepositoryInMemory: DecksRepositoryInMemory;
let removeDecksUseCase: RemoveDecksUseCase;
let createDecksUseCase: CreateDecksUseCase;
let listDecksUseCase: ListDecksUseCase;
let indexDecksUseCase: IndexDecksUseCase;

describe("Remove Decks", () => {
    beforeEach(() => {
        decksRepositoryInMemory = new DecksRepositoryInMemory();
        removeDecksUseCase = new RemoveDecksUseCase(decksRepositoryInMemory);
        createDecksUseCase = new CreateDecksUseCase(decksRepositoryInMemory);
        listDecksUseCase = new ListDecksUseCase(decksRepositoryInMemory);
        indexDecksUseCase = new IndexDecksUseCase(decksRepositoryInMemory);
    });

    it("Should be able to remove a deck", async () => {
        const userId = uuid();
        await createDecksUseCase.execute({ name: 'test', userId })

        const decks = await listDecksUseCase.execute({ userId })
        const { id: deckId } = decks[0]

        await removeDecksUseCase.execute({ deckId, userId })

        const deck = await indexDecksUseCase.execute({ deckId, userId })

        expect(deck.active).toBe(false)
    });

    it("Should not be able to remove a non existing deck", async () => {
        try {
            const deckId = uuid();
            const userId = uuid();
    
            await removeDecksUseCase.execute({ deckId, userId })            
        } catch (e) {
            expect(e.statusCode).toBe(400)
        }            
    });
});