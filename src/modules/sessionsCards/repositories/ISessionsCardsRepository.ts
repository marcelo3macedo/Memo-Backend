import IIndexSessionsCardsDTO from "@modules/sessionsCards/dtos/IIndexSessionsCardsDTO";
import SessionCard from "@modules/sessionsCards/entities/SessionCard";
import IUpdateSessionsCardsDTO from "../dtos/IUpdateSessionsCardsDTO";

export interface ISessionsCardsRepository {
  index(data: IIndexSessionsCardsDTO): Promise<SessionCard>;
  update(data: IUpdateSessionsCardsDTO): Promise<void>;
}