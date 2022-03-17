import { v4 as uuid } from "uuid";
import { CardsRepositoryInMemory } from "@modules/cards/repositories/in-memory/CardsRepositoryInMemory";
import { IndexCardsUseCase } from "./IndexCardsUseCase";
import { ListCardsUseCase } from "../listCards/ListCardsUseCase";
import Deck from "@modules/decks/entities/Deck";
import Card from "@modules/cards/entities/Card";
import { CreateCardsUseCase } from "../createCards/CreateCardsUseCase";

let cardsRepositoryInMemory: CardsRepositoryInMemory;
let indexCardsUseCase: IndexCardsUseCase;
let listCardsUseCase: ListCardsUseCase;
let createCardsUseCase: CreateCardsUseCase;

describe("Index Cards", () => {
    beforeEach(() => {
        cardsRepositoryInMemory = new CardsRepositoryInMemory();
        indexCardsUseCase = new IndexCardsUseCase(cardsRepositoryInMemory);
        listCardsUseCase = new ListCardsUseCase(cardsRepositoryInMemory);      
        createCardsUseCase = new CreateCardsUseCase(cardsRepositoryInMemory);       
    });

    it("Should be able to select a card", async () => {
        const deck = new Deck();
        deck.id = uuid();

        await createCardsUseCase.execute({ deck, title: 'test', content: 'test', secretContent: 'test' })

        const cards = await listCardsUseCase.execute({ deckId: deck.id })
        const cardId = cards[0]["id"]

        const card = await indexCardsUseCase.execute({ cardId })

        expect(card).toBeInstanceOf(Card);        
    });

    it("Should not be able to select a nonexisting card", async () => {     
        const card = await indexCardsUseCase.execute({ cardId: uuid() })

        expect(card).not.toBeInstanceOf(Card);  
    });
});