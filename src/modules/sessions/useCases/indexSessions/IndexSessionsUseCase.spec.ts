import { v4 as uuid } from "uuid";
import { CardsRepositoryInMemory } from "@modules/cards/repositories/in-memory/CardsRepositoryInMemory";
import { DecksRepositoryInMemory } from "@modules/decks/repositories/in-memory/DecksRepositoryInMemory";
import { SessionsRepositoryInMemory } from "@modules/sessions/repositories/in-memory/SessionsRepositoryInMemory";
import { IndexSessionsUseCase } from "./IndexSessionsUseCase";
import { CreateDecksUseCase } from "@modules/decks/useCases/createDecks/CreateDecksUseCase";
import { CreateCardsUseCase } from "@modules/cards/useCases/createCards/CreateCardsUseCase";
import { AppError } from "@shared/errors/AppError";
import { CreateSessionsUseCase } from "../createSessions/CreateSessionsUseCase";

let sessionsRepositoryInMemory: SessionsRepositoryInMemory;
let decksRepositoryInMemory: DecksRepositoryInMemory;
let cardsRepositoryInMemory: CardsRepositoryInMemory;
let indexSessionsUseCase: IndexSessionsUseCase;
let createDecksUseCase: CreateDecksUseCase;
let createSessionsUseCase: CreateSessionsUseCase;
let createCardsUseCase: CreateCardsUseCase;

describe("Index Sessions", () => {
    beforeEach(() => {
        sessionsRepositoryInMemory = new SessionsRepositoryInMemory();
        decksRepositoryInMemory = new DecksRepositoryInMemory();
        cardsRepositoryInMemory = new CardsRepositoryInMemory();
        indexSessionsUseCase = new IndexSessionsUseCase(sessionsRepositoryInMemory);
        createDecksUseCase = new CreateDecksUseCase(decksRepositoryInMemory);
        createSessionsUseCase = new CreateSessionsUseCase(sessionsRepositoryInMemory, decksRepositoryInMemory, cardsRepositoryInMemory);
        createCardsUseCase = new CreateCardsUseCase(cardsRepositoryInMemory);
    });

    it("Should be able to index a session", async () => {
        expect(async () => {
            const userId = uuid();
            const deck = await createDecksUseCase.execute({ name: 'test', parentId: null, userId: userId, isPublic: false, frequencyId: null });
            const card = await createCardsUseCase.execute({ title: 'test', content: 'test', secretContent: 'test', deck })

            const cards = [];
            cards.push(card);
            const session = await createSessionsUseCase.execute({ userId, deckId: deck.id, cards});

            await indexSessionsUseCase.execute({ sessionId: session.id, userId })
        }).not.toThrow()
    });

    it("Should not be able to index a session of another user", async () => {
        expect(async () => {
            const userId = uuid();
            const anotherId = uuid();
            const deck = await createDecksUseCase.execute({ name: 'test', parentId: null, userId: userId, isPublic: false, frequencyId: null });
            const card = await createCardsUseCase.execute({ title: 'test', content: 'test', secretContent: 'test', deck })

            const cards = [];
            cards.push(card);
            const session = await createSessionsUseCase.execute({ userId, deckId: deck.id, cards});

            await indexSessionsUseCase.execute({ sessionId: session.id, userId: anotherId })
        }).rejects.toBeInstanceOf(AppError);
    });
});