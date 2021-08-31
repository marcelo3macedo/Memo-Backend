import Card from '../entities/Card';
import IListCardsDTO from "@modules/cards/dtos/IListCardsDTO";
import ICreateCardsDTO from "@modules/cards/dtos/ICreateCardsDTO";
import IIndexCardsDTO from "@modules/cards/dtos/IIndexCardsDTO";
import IFilterCardsDTO from "@modules/cards/dtos/IFilterCardsDTO";
import IUpdateCardsDTO from "@modules/cards/dtos/IUpdateCardsDTO";
import IRemoveCardsDTO from "@modules/cards/dtos/IRemoveCardsDTO";

export default interface ICardsRepository {
  list(data: IListCardsDTO): Promise<Card[]>;
  create(data: ICreateCardsDTO): Promise<void>;
  index(data: IIndexCardsDTO): Promise<Card>;
  update(data: IUpdateCardsDTO): Promise<void>;
  remove(data: IRemoveCardsDTO): Promise<void>;
  filter(data:IFilterCardsDTO): Promise<Card[]>
}