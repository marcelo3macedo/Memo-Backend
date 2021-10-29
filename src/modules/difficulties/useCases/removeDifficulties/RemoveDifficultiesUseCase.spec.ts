import { RemoveDifficultiesUseCase } from "./RemoveDifficultiesUseCase";
import { DifficultiesRepositoryInMemory } from "@modules/difficulties/repositories/in-memory/DifficultiesRepositoryInMemory";

let difficultiesRepositoryInMemory: DifficultiesRepositoryInMemory;
let removeDifficultiesUseCase: RemoveDifficultiesUseCase;

describe("Remove Difficulties", () => {
    beforeEach(() => {
        difficultiesRepositoryInMemory = new DifficultiesRepositoryInMemory();
        removeDifficultiesUseCase = new RemoveDifficultiesUseCase(difficultiesRepositoryInMemory);
    });
});