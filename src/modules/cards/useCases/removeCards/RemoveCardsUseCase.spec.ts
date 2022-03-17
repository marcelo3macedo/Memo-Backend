import { v4 as uuid } from "uuid";
import { CardsRepositoryInMemory } from "@modules/cards/repositories/in-memory/CardsRepositoryInMemory";
import { IndexCardsUseCase } from "../indexCards/IndexCardsUseCase";
import { ListCardsUseCase } from "../listCards/ListCardsUseCase";
import { RemoveCardsUseCase } from "./RemoveCardsUseCase";
import Deck from "@modules/decks/entities/Deck";
import { CreateCardsUseCase } from "../createCards/CreateCardsUseCase";

let cardsRepositoryInMemory: CardsRepositoryInMemory;
let indexCardsUseCase: IndexCardsUseCase;
let listCardsUseCase: ListCardsUseCase;
let createCardsUseCase: CreateCardsUseCase;
let removeCardsUseCase: RemoveCardsUseCase;

describe("Remove Cards", () => {
    beforeEach(() => {
        cardsRepositoryInMemory = new CardsRepositoryInMemory();
        indexCardsUseCase = new IndexCardsUseCase(cardsRepositoryInMemory);
        listCardsUseCase = new ListCardsUseCase(cardsRepositoryInMemory);      
        createCardsUseCase = new CreateCardsUseCase(cardsRepositoryInMemory);       
        removeCardsUseCase = new RemoveCardsUseCase(cardsRepositoryInMemory);       
    });

    it("Should be to remove a card", async () => {
        const deck = new Deck();
        deck.id = uuid();

        await createCardsUseCase.execute({ deck, title: 'test', content: 'test', secretContent: 'test' })

        const cards = await listCardsUseCase.execute({ deckId: deck.id })
        const cardId = cards[0]["id"]

        await removeCardsUseCase.execute({ cardId })

        const card = await indexCardsUseCase.execute({ cardId })

        expect(card).toBeUndefined();
    });

    it("Should not be able to remove a non existing card", async () => {
        try {
            const cardId = uuid();
    
            await removeCardsUseCase.execute({ cardId })       
        } catch (e) {
            expect(e.statusCode).toBe(400)
        }            
    });
});