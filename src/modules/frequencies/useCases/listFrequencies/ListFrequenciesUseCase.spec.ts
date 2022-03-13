import { FrequenciesRepositoryInMemory } from "@modules/frequencies/repositories/in-memory/FrequenciesRepositoryInMemory";
import { ListFrequenciesUseCase } from "../listFrequencies/ListFrequenciesUseCase";

let frequenciesRepositoryInMemory: FrequenciesRepositoryInMemory;
let listFrequenciesUseCase: ListFrequenciesUseCase;

describe("List Frequencies", () => {
    beforeEach(() => {
        frequenciesRepositoryInMemory = new FrequenciesRepositoryInMemory();
        listFrequenciesUseCase = new ListFrequenciesUseCase(frequenciesRepositoryInMemory);
    });

    it("Should be list frequencies", async () => {
        const response = await listFrequenciesUseCase.execute()
        expect(response).toBeInstanceOf(Array);
    });
});