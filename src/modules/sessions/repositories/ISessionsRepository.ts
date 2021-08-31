import Session from '../entities/Session';
import IListSessionsDTO from "@modules/sessions/dtos/IListSessionsDTO";
import ICreateSessionsDTO from "@modules/sessions/dtos/ICreateSessionsDTO";
import IUpdateSessionsDTO from "@modules/sessions/dtos/IUpdateSessionsDTO";
import IRemoveSessionsDTO from "@modules/sessions/dtos/IRemoveSessionsDTO";
import IIndexSessionsDTO from '../dtos/IIndexSessionsDTO';
import IFilterSessionsDTO from '../dtos/IFilterSessionsDTO';

export interface ISessionsRepository {
  list(data: IListSessionsDTO): Promise<Session[]>;
  last(data: IListSessionsDTO): Promise<Session>;
  index(data: IIndexSessionsDTO): Promise<Session>;
  create(data: ICreateSessionsDTO): Promise<void>;
  update(data: IUpdateSessionsDTO): Promise<void>;
  remove(data: IRemoveSessionsDTO): Promise<void>;
  filter(data: IFilterSessionsDTO): Promise<Session[]>;
}