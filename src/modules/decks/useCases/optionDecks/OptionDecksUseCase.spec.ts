import { FrequenciesRepositoryInMemory } from "@modules/frequencies/repositories/in-memory/FrequenciesRepositoryInMemory";
import { OptionDecksUseCase } from "./OptionDecksUseCase";
import { ThemesRepositoryInMemory } from "@modules/themes/repositories/in-memory/ThemeRepositoryInMemory";

let themeRepositoryInMemory: ThemesRepositoryInMemory;
let frequenciesRepositoryInMemory: FrequenciesRepositoryInMemory;
let optionDecksUseCase: OptionDecksUseCase;

describe("Options Decks", () => {
    beforeEach(() => {
        themeRepositoryInMemory = new ThemesRepositoryInMemory();
        frequenciesRepositoryInMemory = new FrequenciesRepositoryInMemory();
        optionDecksUseCase = new OptionDecksUseCase(frequenciesRepositoryInMemory, themeRepositoryInMemory);
    });

    it("Should be able to get deck options", async () => {
        const options = await optionDecksUseCase.execute();
        expect(options).not.toBe(null);
    });
});