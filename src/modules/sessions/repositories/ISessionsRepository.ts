import Session from '../entities/Session';
import IListSessionsDTO from "@modules/sessions/dtos/IListSessionsDTO";
import ICreateSessionsDTO from "@modules/sessions/dtos/ICreateSessionsDTO";
import IRemoveSessionsDTO from "@modules/sessions/dtos/IRemoveSessionsDTO";
import IIndexSessionsDTO from '../dtos/IIndexSessionsDTO';
import IFilterSessionsDTO from '../dtos/IFilterSessionsDTO';
import IIndexSessionsDeckDTO from '../dtos/IIndexSessionsDeckDTO';
import IListHistorySessionsDTO from '../dtos/IListHistorySessionsDTO';
import IExistsSessionsDTO from '../dtos/IExistsSessionsDTO';

export interface ISessionsRepository {
  list(data: IListSessionsDTO): Promise<Session[]>;
  last(data: IListSessionsDTO): Promise<Session>;
  index(data: IIndexSessionsDTO): Promise<Session>;
  indexByDeck(data: IIndexSessionsDeckDTO): Promise<Session>;
  create(data: ICreateSessionsDTO): Promise<Session>;
  exists(data: IExistsSessionsDTO): Promise<Session>;
  remove(data: IRemoveSessionsDTO): Promise<void>;
  filter(data: IFilterSessionsDTO): Promise<Session[]>;
  history(data: IListHistorySessionsDTO): Promise<Session[]>;
}