import { IDifficultiesRepository } from "../IDifficultiesRepository";
import Difficulty from "@modules/difficulties/entities/Difficulty";
import IRemoveDifficultiesDTO from "@modules/difficulties/dtos/IRemoveDifficultiesDTO";

class DifficultiesRepositoryInMemory implements IDifficultiesRepository {
    difficulties: Difficulty[] = [];

    async all(): Promise<Difficulty[]> {
        return this.difficulties;
    }

    async create({ name }): Promise<void> {
        const difficulty = new Difficulty();

        Object.assign(difficulty, {
            name
        });

        this.difficulties.push(difficulty);
      }
    
    async remove({ difficultyId }: IRemoveDifficultiesDTO): Promise<void> {
        this.difficulties = this.difficulties.filter(x => x.id != difficultyId);
    }
}

export { DifficultiesRepositoryInMemory }