import { v4 as uuid } from "uuid";
import { DecksRepositoryInMemory } from "@modules/decks/repositories/in-memory/DecksRepositoryInMemory";
import { CreateDecksUseCase } from "@modules/decks/useCases/createDecks/CreateDecksUseCase";
import { CloneDecksUseCase } from "./CloneDecksUseCase";
import { CardsRepositoryInMemory } from "@modules/cards/repositories/in-memory/CardsRepositoryInMemory";
import { FrequenciesRepositoryInMemory } from "@modules/frequencies/repositories/in-memory/FrequenciesRepositoryInMemory";
import Deck from "@modules/decks/entities/Deck";
import { AppError } from "@shared/errors/AppError";

let decksRepositoryInMemory: DecksRepositoryInMemory;
let cardsRepositoryInMemory: CardsRepositoryInMemory;
let frequenciesRepositoryInMemory: FrequenciesRepositoryInMemory;
let createDecksUseCase: CreateDecksUseCase;
let cloneDecksUseCase: CloneDecksUseCase;

describe("Creating Decks", () => {
    beforeEach(() => {
        decksRepositoryInMemory = new DecksRepositoryInMemory();
        cardsRepositoryInMemory = new CardsRepositoryInMemory();
        frequenciesRepositoryInMemory = new FrequenciesRepositoryInMemory();
        createDecksUseCase = new CreateDecksUseCase(decksRepositoryInMemory);
        cloneDecksUseCase = new CloneDecksUseCase(decksRepositoryInMemory, cardsRepositoryInMemory, frequenciesRepositoryInMemory);
    });

    it("Should be allow to clone a existing deck", async () => {
        const userId = uuid();
        const deck = await createDecksUseCase.execute({ name: 'test', parentId: null, userId: userId, isPublic: false, frequencyId: null });

        const cloneResponse = await cloneDecksUseCase.execute({ deckId: deck.id, userId });
        expect(cloneResponse).toBeInstanceOf(Deck);
    });
});