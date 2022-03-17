import { CategoriesRepositoryInMemory } from "@modules/categories/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoriesUseCase } from "../createCategories/CreateCategoriesUseCase";
import { ListCategoriesUseCase } from "../listCategories/ListCategoriesUseCase";
import { IndexCategoriesUseCase } from "./IndexCategoriesUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoriesUseCase: CreateCategoriesUseCase;
let indexCategoriesUseCase: IndexCategoriesUseCase;
let listCategoriesUseCase: ListCategoriesUseCase;

describe("Index Category", () => {
    beforeEach(async () => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoriesUseCase = new CreateCategoriesUseCase(categoriesRepositoryInMemory);
        indexCategoriesUseCase = new IndexCategoriesUseCase(categoriesRepositoryInMemory);
        listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepositoryInMemory);
    });

    it("Should be able to index a category", async () => {   
        await createCategoriesUseCase.execute({ name: 'test '});
        const categories = await listCategoriesUseCase.execute();
        
        if (!categories) {
            throw("Not found")
        }

        const { id } = categories[0];        
        const category = await indexCategoriesUseCase.execute({ categoryId: id });
        
        expect(category).not.toBe(null);
    });
});