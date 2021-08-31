import Difficulty from "@modules/difficulties/entities/Difficulty";

export interface IDifficultiesRepository {
  all(): Promise<Difficulty[]>;
}