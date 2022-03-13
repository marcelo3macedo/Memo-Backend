import { v4 as uuid } from "uuid";
import { CardsRepositoryInMemory } from "@modules/cards/repositories/in-memory/CardsRepositoryInMemory";
import { DecksRepositoryInMemory } from "@modules/decks/repositories/in-memory/DecksRepositoryInMemory";
import { SessionsRepositoryInMemory } from "@modules/sessions/repositories/in-memory/SessionsRepositoryInMemory";
import { ListSessionsUseCase } from "./ListSessionsUseCase";
import { CreateDecksUseCase } from "@modules/decks/useCases/createDecks/CreateDecksUseCase";
import { CreateCardsUseCase } from "@modules/cards/useCases/createCards/CreateCardsUseCase";
import { RemoveDecksUseCase } from "@modules/decks/useCases/removeDecks/RemoveDecksUseCase";
import { CreateSessionsUseCase } from "../createSessions/CreateSessionsUseCase";

let sessionsRepositoryInMemory: SessionsRepositoryInMemory;
let decksRepositoryInMemory: DecksRepositoryInMemory;
let cardsRepositoryInMemory: CardsRepositoryInMemory;
let listSessionsUseCase: ListSessionsUseCase;
let createDecksUseCase: CreateDecksUseCase;
let createSessionsUseCase: CreateSessionsUseCase;
let createCardsUseCase: CreateCardsUseCase;
let removeDecksUseCase: RemoveDecksUseCase;

describe("List Sessions", () => {
    beforeEach(() => {
        sessionsRepositoryInMemory = new SessionsRepositoryInMemory();
        decksRepositoryInMemory = new DecksRepositoryInMemory();
        cardsRepositoryInMemory = new CardsRepositoryInMemory();
        listSessionsUseCase = new ListSessionsUseCase(sessionsRepositoryInMemory);
        createDecksUseCase = new CreateDecksUseCase(decksRepositoryInMemory);
        removeDecksUseCase = new RemoveDecksUseCase(decksRepositoryInMemory);
        createSessionsUseCase = new CreateSessionsUseCase(sessionsRepositoryInMemory, decksRepositoryInMemory, cardsRepositoryInMemory);
        createCardsUseCase = new CreateCardsUseCase(cardsRepositoryInMemory);
    });

    it("Should be able to list sessions", async () => {
        const userId = uuid();
        const deck = await createDecksUseCase.execute({ name: 'test', parentId: null, userId: userId, isPublic: false, frequencyId: null });
        const card = await createCardsUseCase.execute({ title: 'test', content: 'test', secretContent: 'test', deck })

        const cards = [];
        cards.push(card);
        await createSessionsUseCase.execute({ userId, deckId: deck.id, cards});

        const sessions = await listSessionsUseCase.execute({ userId });

        expect(sessions.length).toBeGreaterThan(0);
    });
});