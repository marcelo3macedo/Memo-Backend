import { v4 as uuid } from "uuid";
import { CardsRepositoryInMemory } from "@modules/cards/repositories/in-memory/CardsRepositoryInMemory";
import { IndexCardsUseCase } from "../indexCards/IndexCardsUseCase";
import { ListCardsUseCase } from "../listCards/ListCardsUseCase";
import { UpdateCardsUseCase } from "./UpdateCardsUseCase";
import Deck from "@modules/decks/entities/Deck";
import { CreateCardsUseCase } from "../createCards/CreateCardsUseCase";

let cardsRepositoryInMemory: CardsRepositoryInMemory;
let indexCardsUseCase: IndexCardsUseCase;
let listCardsUseCase: ListCardsUseCase;
let createCardsUseCase: CreateCardsUseCase;
let updateCardsUseCase: UpdateCardsUseCase;

describe("Update Cards", () => {
    beforeEach(() => {
        cardsRepositoryInMemory = new CardsRepositoryInMemory();
        indexCardsUseCase = new IndexCardsUseCase(cardsRepositoryInMemory);
        listCardsUseCase = new ListCardsUseCase(cardsRepositoryInMemory);      
        createCardsUseCase = new CreateCardsUseCase(cardsRepositoryInMemory);       
        updateCardsUseCase = new UpdateCardsUseCase(cardsRepositoryInMemory);       
    });

    it("Should be to update a card", async () => {
        const deck = new Deck();
        deck.id = uuid();

        await createCardsUseCase.execute({ deck, title: 'test', content: 'test', secretContent: 'test' });

        const cards = await listCardsUseCase.execute({ deckId: deck.id });
        const cardId = cards[0]["id"];

        await updateCardsUseCase.execute({ cardId, title: 'test', content: 'updated', secretContent: 'updated' });

        const card = await indexCardsUseCase.execute({ deck, cardId });

        expect(card.content).toBe('updated');
    });
});