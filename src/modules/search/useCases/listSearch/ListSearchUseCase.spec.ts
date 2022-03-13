import { DecksRepositoryInMemory } from "@modules/decks/repositories/in-memory/DecksRepositoryInMemory";
import { ListSearchUseCase } from "./ListSearchUseCase";
import { FeaturedDecksRepositoryInMemory } from "@modules/featured/repositories/in-memory/FeaturedDecksRepositoryInMemory";
import { CategoriesRepositoryInMemory } from "@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let decksRepositoryInMemory: DecksRepositoryInMemory;
let featuredDecksRepositoryInMemory: FeaturedDecksRepositoryInMemory;
let listSearchUseCase: ListSearchUseCase;

describe("Seach Infos", () => {
    beforeEach(() => {
        decksRepositoryInMemory = new DecksRepositoryInMemory();
        featuredDecksRepositoryInMemory = new FeaturedDecksRepositoryInMemory();
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        listSearchUseCase = new ListSearchUseCase(categoriesRepositoryInMemory, decksRepositoryInMemory, featuredDecksRepositoryInMemory);
    });

    it("Should be able to search infos", async () => {
        expect(async () => {
            await listSearchUseCase.execute({ page:0, query:null });
        }).not.toThrow()
    });
});