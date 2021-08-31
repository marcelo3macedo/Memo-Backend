import IIndexSessionsCardsDTO from "@modules/sessionsCards/dtos/IIndexSessionsCardsDTO";
import SessionCard from "@modules/sessionsCards/entities/SessionCard";
import IUpdateSessionsCardDTO from "../dtos/IUpdateSessionsCardDTO";

export interface ISessionsCardsRepository {
  index(data: IIndexSessionsCardsDTO): Promise<SessionCard>;
  update(data: IUpdateSessionsCardDTO): Promise<void>;
}