import IUpdateSessionsCardsDTO from "../dtos/IUpdateSessionsCardsDTO";

export interface ISessionsCardRepository {
  update(data: IUpdateSessionsCardsDTO): Promise<void>;
}