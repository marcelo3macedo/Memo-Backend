import { DifficultiesRepositoryInMemory } from "@modules/difficulties/repositories/in-memory/DifficultiesRepositoryInMemory";
import { ListDifficultiesUseCase } from "./ListDifficultiesUseCase";

let difficultiesRepositoryInMemory: DifficultiesRepositoryInMemory;
let listDifficultiesUseCase: ListDifficultiesUseCase;

describe("List Difficulties", () => {
    beforeEach(() => {
        difficultiesRepositoryInMemory = new DifficultiesRepositoryInMemory();
        listDifficultiesUseCase = new ListDifficultiesUseCase(difficultiesRepositoryInMemory);
    });

    it("Should be list difficulties", async () => {
        expect(async () => {
            await listDifficultiesUseCase.execute();
        }).not.toThrow();
    });
});