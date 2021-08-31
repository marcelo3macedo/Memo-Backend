import { CardsRepositoryInMemory } from "@modules/cards/repositories/in-memory/CardsRepositoryInMemory";
import { CreateCardsUseCase } from "./CreateCardsUseCase";
import Deck from "@modules/decks/entities/Deck";

let cardsRepositoryInMemory: CardsRepositoryInMemory;
let createCardsUseCase: CreateCardsUseCase;

describe("Create Cards", () => {
    beforeEach(() => {
        cardsRepositoryInMemory = new CardsRepositoryInMemory();
        createCardsUseCase = new CreateCardsUseCase(cardsRepositoryInMemory);
    });

    it("Should be able to create cards", async () => {
        expect(async () => {
            await createCardsUseCase.execute({ content: 'test', secretContent: 'test', deck: new Deck() })
        }).not.toThrow()
    });
});