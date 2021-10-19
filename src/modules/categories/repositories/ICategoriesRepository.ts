import ICreateCategoriesDTO from '../dtos/ICreateCategoriesDTO';
import Category from '../entities/Category';

export default interface ICategoriesRepository {
  list(): Promise<Category[]>;
  create(data: ICreateCategoriesDTO): Promise<void>;
}