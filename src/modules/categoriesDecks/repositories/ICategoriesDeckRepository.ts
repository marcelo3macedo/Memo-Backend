import ICreateCategoriesDeckDTO from "../dtos/ICreateCategoriesDeckDTO";
import IDeleteCategoriesDeckDTO from "../dtos/IDeleteCategoriesDeckDTO";

export default interface ICategoriesDeckRepository {
  create(data: ICreateCategoriesDeckDTO): Promise<void>;
  remove(data: IDeleteCategoriesDeckDTO):Promise<void>;
}