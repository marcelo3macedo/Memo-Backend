import { IDifficultiesRepository } from "../IDifficultiesRepository";
import Difficulty from "@modules/difficulties/entities/Difficulty";
import IRemoveDifficultiesDTO from "@modules/difficulties/dtos/IRemoveDifficultiesDTO";

class DifficultiesRepositoryInMemory implements IDifficultiesRepository {
    difficulties: Difficulty[] = [];

    async all(): Promise<Difficulty[]> {
        return this.difficulties;
    }
    
    async remove({ difficultyId }: IRemoveDifficultiesDTO): Promise<void> {
        this.difficulties = this.difficulties.filter(x => x.id != difficultyId);
    }
}

export { DifficultiesRepositoryInMemory }