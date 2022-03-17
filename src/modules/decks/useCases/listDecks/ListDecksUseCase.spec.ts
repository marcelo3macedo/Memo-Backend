import { v4 as uuid } from "uuid";
import { DecksRepositoryInMemory } from "@modules/decks/repositories/in-memory/DecksRepositoryInMemory";
import { CreateDecksUseCase } from "../createDecks/CreateDecksUseCase";
import { ListDecksUseCase } from "./ListDecksUseCase";

let decksRepositoryInMemory: DecksRepositoryInMemory;
let createDecksUseCase: CreateDecksUseCase;
let listDecksUseCase: ListDecksUseCase;

describe("List Decks", () => {
    beforeEach(() => {
        decksRepositoryInMemory = new DecksRepositoryInMemory();
        createDecksUseCase = new CreateDecksUseCase(decksRepositoryInMemory);
        listDecksUseCase = new ListDecksUseCase(decksRepositoryInMemory);
    });

    it("Should be list your decks", async () => {
        const userId = uuid();
        const response = await listDecksUseCase.execute({ userId, isPublic:false, name:null, page:0 })
        expect(response).toBeInstanceOf(Array);
    });

    it("Should not be able to view another user deck", async () => {
        const anotherUserId = uuid();
        await createDecksUseCase.execute({ name: 'test', userId: anotherUserId, isPublic: false, parentId: null, path: null, frequencyId: null })

        const userId = uuid();
        const response = await listDecksUseCase.execute({ userId, isPublic:false, name:null, page:0 })
        expect(response.length).toBe(0);
    });
});