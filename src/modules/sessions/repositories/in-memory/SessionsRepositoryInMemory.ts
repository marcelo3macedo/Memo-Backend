import { ISessionsRepository } from "../ISessionsRepository";
import Session from "@modules/sessions/entities/Session";

class SessionsRepositoryInMemory implements ISessionsRepository {
    sessions: Session[] = [];

    async list({}): Promise<Session[]> {
        return this.sessions;
    }

    async last({}): Promise<Session> {
        return
    }

    async index({}): Promise<Session> {
        return
    }

    async indexByDeck({}): Promise<Session> {
        return
    }

    async create({ userId, deck, cards }): Promise<Session> {
        const session = new Session();
        Object.assign(session, {
          userId,
          deck,
          cards
        });

        this.sessions.push(session);
        return session;
    }

    async exists({ userId, deckId }): Promise<Session> {
        return this.sessions.find(s => s.deckId === deckId && s.userId === userId);
    }

    async remove({ userId, sessionId }): Promise<void> {
        this.sessions = this.sessions.filter(s => (s.userId !== userId && s.id !== sessionId));
    }

    async filter({}): Promise<Session[]> {
        return
    }

    async history({}): Promise<Session[]> {
        return
    }

    async update({}): Promise<void> {        
    }
}

export { SessionsRepositoryInMemory }