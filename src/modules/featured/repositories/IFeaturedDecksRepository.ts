import ICreateFeaturedDecksDTO from "../dtos/ICreateFeaturedDecksDTO";
import IListFeaturedDecksDTO from "../dtos/IListFeaturedDecksDTO";
import IRemoveFeaturedDecksDTO from "../dtos/IRemoveFeaturedDecksDTO";
import FeaturedDecks from "../entities/FeaturedDecks";

export interface IFeaturedDecksRepository {
  all(): Promise<FeaturedDecks[]>;
  filter(data: IListFeaturedDecksDTO): Promise<FeaturedDecks[]>;
  create(data: ICreateFeaturedDecksDTO): Promise<void>;
  remove(data: IRemoveFeaturedDecksDTO): Promise<void>;
}