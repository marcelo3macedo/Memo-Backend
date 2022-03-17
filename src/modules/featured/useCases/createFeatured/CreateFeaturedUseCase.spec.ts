import { v4 as uuid } from "uuid";
import { DecksRepositoryInMemory } from "@modules/decks/repositories/in-memory/DecksRepositoryInMemory";
import { CreateFeaturedUseCase } from "./CreateFeaturedUseCase";
import { FeaturedDecksRepositoryInMemory } from "@modules/featured/repositories/in-memory/FeaturedDecksRepositoryInMemory";
import { CategoriesRepositoryInMemory } from "@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateDecksUseCase } from "@modules/decks/useCases/createDecks/CreateDecksUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let decksRepositoryInMemory: DecksRepositoryInMemory;
let featuredDecksRepositoryInMemory: FeaturedDecksRepositoryInMemory;
let createDecksUseCase: CreateDecksUseCase;
let createFeaturedUseCase: CreateFeaturedUseCase;

describe("Create Featured Deck", () => {
    beforeEach(() => {
        decksRepositoryInMemory = new DecksRepositoryInMemory();
        featuredDecksRepositoryInMemory = new FeaturedDecksRepositoryInMemory();
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createDecksUseCase = new CreateDecksUseCase(decksRepositoryInMemory);
        createFeaturedUseCase = new CreateFeaturedUseCase(featuredDecksRepositoryInMemory, decksRepositoryInMemory);
    });

    it("Should be able to create a featured deck", async () => {
        expect(async () => {
            const userId = uuid();
            const deck = await createDecksUseCase.execute({ name: 'test', parentId: null, userId: userId, isPublic: false, frequencyId: null });
            await createFeaturedUseCase.execute({ deckId: deck.id });
        }).not.toThrow()
    });
});