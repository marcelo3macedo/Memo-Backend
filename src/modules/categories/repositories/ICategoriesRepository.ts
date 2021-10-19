import ICreateCategoriesDTO from '../dtos/ICreateCategoriesDTO';
import IIndexCategoriesDTO from '../dtos/IIndexCategoriesDTO';
import Category from '../entities/Category';

export default interface ICategoriesRepository {
  list(): Promise<Category[]>;
  create(data: ICreateCategoriesDTO): Promise<void>;
  index(data: IIndexCategoriesDTO): Promise<Category>;
}