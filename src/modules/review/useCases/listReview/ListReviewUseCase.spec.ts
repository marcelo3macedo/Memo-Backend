import { v4 as uuid } from "uuid";
import { ListReviewUseCase } from "./ListReviewUseCase";
import { FeaturedDecksRepositoryInMemory } from "@modules/featured/repositories/in-memory/FeaturedDecksRepositoryInMemory";
import { SessionsRepositoryInMemory } from "@modules/sessions/repositories/in-memory/SessionsRepositoryInMemory";

let sessionsRepositoryInMemory: SessionsRepositoryInMemory;
let featuredDecksRepositoryInMemory: FeaturedDecksRepositoryInMemory;
let listReviewUseCase: ListReviewUseCase;

describe("Review Info", () => {
    beforeEach(() => {
        sessionsRepositoryInMemory = new SessionsRepositoryInMemory();
        featuredDecksRepositoryInMemory = new FeaturedDecksRepositoryInMemory();
        listReviewUseCase = new ListReviewUseCase(sessionsRepositoryInMemory, featuredDecksRepositoryInMemory);
    });

    it("Should be able to review info", async () => {
        expect(async () => {
            const userId = uuid();
            await listReviewUseCase.execute({ userId });
        }).not.toThrow()
    });
});