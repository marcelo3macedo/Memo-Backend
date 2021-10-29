import { CreateDifficultiesUseCase } from "./CreateDifficultiesUseCase";
import { DifficultiesRepositoryInMemory } from "@modules/difficulties/repositories/in-memory/DifficultiesRepositoryInMemory";

let difficultiesRepositoryInMemory: DifficultiesRepositoryInMemory;
let createDifficultiesUseCase: CreateDifficultiesUseCase;

describe("Create Difficulties", () => {
    beforeEach(() => {
        difficultiesRepositoryInMemory = new DifficultiesRepositoryInMemory();
        createDifficultiesUseCase = new CreateDifficultiesUseCase(difficultiesRepositoryInMemory);
    });

    it("Should be able to create a difficulty", async () => {
        expect(async () => {
            await createDifficultiesUseCase.execute({ name: 'test' })
        }).not.toThrow()
    });
});