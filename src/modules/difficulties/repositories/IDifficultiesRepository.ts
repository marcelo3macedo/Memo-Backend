import Difficulty from "@modules/difficulties/entities/Difficulty";
import IRemoveDifficultiesDTO from "../dtos/IRemoveDifficultiesDTO";
import ICreateDifficultiesDTO from "../dtos/ICreateDifficultiesDTO";
import IFindDifficultiesDTO from "../dtos/IFindDifficultiesDTO";

export interface IDifficultiesRepository {
  all(): Promise<Difficulty[]>;
  create(data: ICreateDifficultiesDTO): Promise<void>;
  remove(data: IRemoveDifficultiesDTO): Promise<void>;
  find(data: IFindDifficultiesDTO): Promise<Difficulty>;
}