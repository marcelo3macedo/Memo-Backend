import { CategoriesRepositoryInMemory } from "@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoriesUseCase } from "../createCategories/CreateCategoriesUseCase";
import { ListCategoriesUseCase } from "../listCategories/ListCategoriesUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoriesUseCase: CreateCategoriesUseCase;
let listCategoriesUseCase: ListCategoriesUseCase;

describe("List Category", () => {
    beforeEach(async () => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoriesUseCase = new CreateCategoriesUseCase(categoriesRepositoryInMemory);
        listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepositoryInMemory);
    });

    it("Should be able to list categories", async () => {   
        await createCategoriesUseCase.execute({ name: 'test '});
        const categories = await listCategoriesUseCase.execute();
        
        if (!categories) {
            throw("Not found");
        }

        expect(categories).not.toBe(null);
    });
});