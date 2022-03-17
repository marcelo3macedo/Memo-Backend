import Frequency from "@modules/frequencies/entities/Frequency";
import IFrequenciesRepository from "../IFrequenciesRepository";

class FrequenciesRepositoryInMemory implements IFrequenciesRepository {
    frequencies: Frequency[] = [];

    async list(): Promise<Frequency[]> {
        return this.frequencies;
    }
    
    async getDefault(): Promise<Frequency> {
        const listFrequencies = this.frequencies.filter(f => f.default == true);

        if (listFrequencies) {
            return listFrequencies[0];
        }
    }
}

export { FrequenciesRepositoryInMemory }