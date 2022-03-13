import { v4 as uuid } from "uuid";
import { DecksRepositoryInMemory } from "@modules/decks/repositories/in-memory/DecksRepositoryInMemory";
import { RemoveDecksUseCase } from "./RemoveDecksUseCase";
import { CreateDecksUseCase } from "../createDecks/CreateDecksUseCase";
import { AppError } from "@shared/errors/AppError";

let decksRepositoryInMemory: DecksRepositoryInMemory;
let removeDecksUseCase: RemoveDecksUseCase;
let createDecksUseCase: CreateDecksUseCase;

describe("Remove Decks", () => {
    beforeEach(() => {
        decksRepositoryInMemory = new DecksRepositoryInMemory();
        removeDecksUseCase = new RemoveDecksUseCase(decksRepositoryInMemory);
        createDecksUseCase = new CreateDecksUseCase(decksRepositoryInMemory);
    });

    it("Should be able to remove a deck", async () => {
        expect(async () => {
            const userId = uuid();
            const deck = await createDecksUseCase.execute({ name: 'test', userId, isPublic: false, parentId: null, frequencyId: null });

            await removeDecksUseCase.execute({ deckId: deck.id, userId });
        }).not.toThrowError();
    });

    it("Should not be able to remove another person deck", async () => {
        expect(async () => {
            const userId = uuid();
            const anotherUserId = uuid();
            const deck = await createDecksUseCase.execute({ name: 'test', userId, isPublic: false, parentId: null, frequencyId: null });

            await removeDecksUseCase.execute({ deckId: deck.id, userId: anotherUserId });
        }).rejects.toBeInstanceOf(AppError)
    });

    it("Should not be able to remove a non existing deck", async () => {
        expect(async () => {
            const deckId = uuid();
            const userId = uuid();
    
            await removeDecksUseCase.execute({ deckId, userId });
        }).rejects.toBeInstanceOf(AppError) 
    });
});