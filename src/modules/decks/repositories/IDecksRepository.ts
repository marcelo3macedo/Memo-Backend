import Deck from '../entities/Deck';
import IListDecksDTO from "@modules/decks/dtos/IListDecksDTO";
import ICreateDecksDTO from "@modules/decks/dtos/ICreateDecksDTO";
import IIndexDecksDTO from "@modules/decks/dtos/IIndexDecksDTO";
import IRemoveDecksDTO from "@modules/decks/dtos/IRemoveDecksDTO";
import IPersonalDecksDTO from '../dtos/IPersonalDecksDTO';
import ICountDecksDTO from '../dtos/ICountDecksDTO';
import IUpdateDecksDTO from '../dtos/IUpdateDecksDTO';
import IIndexPathDecksDTO from '../dtos/IIndexPathDecksDTO';
import ICheckSavedDecksDTO from '../dtos/ICheckSavedDecksDTO';

export interface IDecksRepository {
  list(data: IListDecksDTO): Promise<Deck[]>;
  personal(data: IPersonalDecksDTO): Promise<Deck[]>
  index(data: IIndexDecksDTO): Promise<Deck>;
  indexByPath(data: IIndexPathDecksDTO): Promise<Deck>;
  checkIsSaved(data: ICheckSavedDecksDTO): Promise<boolean>;
  create(data: ICreateDecksDTO): Promise<Deck>;
  remove(data: IRemoveDecksDTO): Promise<void>;
  count(data: ICountDecksDTO): Promise<number>;
  update(data: IUpdateDecksDTO): Promise<void>;    
}