import ICategoriesRepository from "../ICategoriesRepository";
import Category from "@modules/categories/entities/Category";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];

    async list(): Promise<Category[]> {
        return this.categories;
    }

    async create({ name }): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            name
        });

        this.categories.push(category);
    }

    async index({ categoryId }): Promise<Category> {
        return this.categories.find(d => d.id === categoryId)!;
    }

    async remove({ categoryId }): Promise<void> {
        this.categories = this.categories.filter(x=> x.id !== categoryId);
    }
}

export { CategoriesRepositoryInMemory }