import { v4 as uuid } from "uuid";
import { DecksRepositoryInMemory } from "@modules/decks/repositories/in-memory/DecksRepositoryInMemory";
import { UpdateDecksUseCase } from "./UpdateDecksUseCase";
import { CreateDecksUseCase } from "../createDecks/CreateDecksUseCase";
import { AppError } from "@shared/errors/AppError";

let decksRepositoryInMemory: DecksRepositoryInMemory;
let updateDecksUseCase: UpdateDecksUseCase;
let createDecksUseCase: CreateDecksUseCase;

describe("Update Decks", () => {
    beforeEach(() => {
        decksRepositoryInMemory = new DecksRepositoryInMemory();
        updateDecksUseCase = new UpdateDecksUseCase(decksRepositoryInMemory);
        createDecksUseCase = new CreateDecksUseCase(decksRepositoryInMemory);
    });

    it("Should be able to update a deck", async () => {
        expect(async () => {
            const userId = uuid();
            const deck = await createDecksUseCase.execute({ name: 'test', userId, isPublic: false, parentId: null, frequencyId: null });

            await updateDecksUseCase.execute({ deckId: deck.id, name: 'updated', description: 'update', frequencyId: null, userId});
        }).not.toThrowError();
    });

    it("Should not be able to update a non existing deck", async () => {
        expect(async () => {
            const deckId = uuid();
            const userId = uuid();
    
            await updateDecksUseCase.execute({ deckId: deckId, name: 'updated', description: 'update', frequencyId: null, userId});
        }).rejects.toBeInstanceOf(AppError);
    });
});