import FeaturedDecks from "@modules/featured/entities/FeaturedDecks";
import { IFeaturedDecksRepository } from "../IFeaturedDecksRepository";

class FeaturedDecksRepositoryInMemory implements IFeaturedDecksRepository {
    featuredDecks: FeaturedDecks[] = [];

    async all(): Promise<FeaturedDecks[]> {
        return this.featuredDecks;
    }

    async filter({ type }): Promise<FeaturedDecks[]> {
        return this.featuredDecks.filter(f => f.type === type);
    }

    async create({ deck }): Promise<void> {
        const featuredDeck = new FeaturedDecks();

        Object.assign(featuredDeck, {
            deck
        });

        this.featuredDecks.push(featuredDeck);
    }

    async remove({ featuredDeckId }): Promise<void> {
        this.featuredDecks = this.featuredDecks.filter(x=> x.id !== featuredDeckId);
    }
}

export { FeaturedDecksRepositoryInMemory }