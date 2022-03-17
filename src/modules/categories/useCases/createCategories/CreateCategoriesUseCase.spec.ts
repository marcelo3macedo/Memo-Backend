import { CategoriesRepositoryInMemory } from "@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoriesUseCase } from "./CreateCategoriesUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoriesUseCase: CreateCategoriesUseCase;

describe("Create Categories", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoriesUseCase = new CreateCategoriesUseCase(categoriesRepositoryInMemory);
    });

    it("Should be able to create a category", async () => {
        expect(async () => {
            await createCategoriesUseCase.execute({ name: 'test' })
        }).not.toThrow()
    });
});