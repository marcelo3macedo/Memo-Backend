import ICreateCategoriesDeckDTO from "../dtos/ICreateCategoriesDeckDTO";

export default interface ICategoriesDeckRepository {
  create(data: ICreateCategoriesDeckDTO): Promise<void>;
}