import { v4 as uuid } from "uuid";
import { CardsRepositoryInMemory } from "@modules/cards/repositories/in-memory/CardsRepositoryInMemory";
import { ListCardsUseCase } from "./ListCardsUseCase";

let cardsRepositoryInMemory: CardsRepositoryInMemory;
let listCardsUseCase: ListCardsUseCase;

describe("List Cards", () => {
    beforeEach(() => {
        cardsRepositoryInMemory = new CardsRepositoryInMemory();
        listCardsUseCase = new ListCardsUseCase(cardsRepositoryInMemory);
    });

    it("Should be list cards from a deck", async () => {
        const deckId = uuid();
        const response = await listCardsUseCase.execute({ deckId })
        expect(response).toBeInstanceOf(Array);
    });
});