import Difficulty from "@modules/difficulties/entities/Difficulty";
import IRemoveDifficultiesDTO from "../dtos/IRemoveDifficultiesDTO";

export interface IDifficultiesRepository {
  all(): Promise<Difficulty[]>;
  remove(data: IRemoveDifficultiesDTO): Promise<void>;
}