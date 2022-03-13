import { v4 as uuid } from "uuid";
import { CardsRepositoryInMemory } from "@modules/cards/repositories/in-memory/CardsRepositoryInMemory";
import { DecksRepositoryInMemory } from "@modules/decks/repositories/in-memory/DecksRepositoryInMemory";
import { SessionsRepositoryInMemory } from "@modules/sessions/repositories/in-memory/SessionsRepositoryInMemory";
import { CreateSessionsUseCase } from "./CreateSessionsUseCase";
import { CreateDecksUseCase } from "@modules/decks/useCases/createDecks/CreateDecksUseCase";
import { CreateCardsUseCase } from "@modules/cards/useCases/createCards/CreateCardsUseCase";
import { AppError } from "@shared/errors/AppError";

let sessionsRepositoryInMemory: SessionsRepositoryInMemory;
let decksRepositoryInMemory: DecksRepositoryInMemory;
let cardsRepositoryInMemory: CardsRepositoryInMemory;
let createSessionsUseCase: CreateSessionsUseCase;
let createDecksUseCase: CreateDecksUseCase;
let createCardsUseCase: CreateCardsUseCase;

describe("Create Sessions", () => {
    beforeEach(() => {
        sessionsRepositoryInMemory = new SessionsRepositoryInMemory();
        decksRepositoryInMemory = new DecksRepositoryInMemory();
        cardsRepositoryInMemory = new CardsRepositoryInMemory();
        createSessionsUseCase = new CreateSessionsUseCase(sessionsRepositoryInMemory, decksRepositoryInMemory, cardsRepositoryInMemory);
        createDecksUseCase = new CreateDecksUseCase(decksRepositoryInMemory);
        createCardsUseCase = new CreateCardsUseCase(cardsRepositoryInMemory);
    });

    it("Should be able to create a session", async () => {
        expect(async () => {
            const userId = uuid();
            const deck = await createDecksUseCase.execute({ name: 'test', parentId: null, userId: userId, isPublic: false, frequencyId: null });
            const card = await createCardsUseCase.execute({ title: 'test', content: 'test', secretContent: 'test', deck })

            const cards = [];
            cards.push(card);

            await createSessionsUseCase.execute({ userId, deckId: deck.id, cards});
        }).not.toThrow()
    });

    it("Should not be able to create a session with a invalid deck", async () => {
        expect(async () => {
            const userId = uuid();
            const deckId = uuid();
            const cards = [];

            await createSessionsUseCase.execute({ userId, deckId, cards})
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a session without cards", async () => {
        expect(async () => {
            const userId = uuid();
            const deck = await createDecksUseCase.execute({ name: 'test', parentId: null, userId: userId, isPublic: false, frequencyId: null });
            const cards = [];

            await createSessionsUseCase.execute({ userId, deckId: deck.id, cards})
        }).rejects.toBeInstanceOf(AppError);
    });
});