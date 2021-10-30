import { v4 as uuid } from "uuid";
import { DecksRepositoryInMemory } from "@modules/decks/repositories/in-memory/DecksRepositoryInMemory";
import { CreateDecksUseCase } from "./CreateDecksUseCase";

let decksRepositoryInMemory: DecksRepositoryInMemory;
let createDecksUseCase: CreateDecksUseCase;

describe("Creating Decks", () => {
    beforeEach(() => {
        decksRepositoryInMemory = new DecksRepositoryInMemory();
        createDecksUseCase = new CreateDecksUseCase(decksRepositoryInMemory);
    });

    it("Should be create a deck", async () => {
        expect(async () => {
            const userId = uuid();
            await createDecksUseCase.execute({ name: 'test', parentId: null, userId: userId, isPublic: false })
        }).not.toThrow()
    });
});