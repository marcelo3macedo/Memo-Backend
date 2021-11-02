import ICreateCategoriesDTO from '../dtos/ICreateCategoriesDTO';
import IIndexCategoriesDTO from '../dtos/IIndexCategoriesDTO';
import IRemoveCategoriesDTO from '../dtos/IRemoveCategoriesDTO';
import Category from '../entities/Category';

export default interface ICategoriesRepository {
  list(): Promise<Category[]>;
  index(data: IIndexCategoriesDTO): Promise<Category>;
  create(data: ICreateCategoriesDTO): Promise<void>;
  remove(data: IRemoveCategoriesDTO): Promise<void>;
}