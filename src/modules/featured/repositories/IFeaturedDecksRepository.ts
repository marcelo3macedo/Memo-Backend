import ICreateFeaturedDecks from "../dtos/ICreateFeaturedDecks";
import IListFeaturedDecks from "../dtos/IListFeaturedDecks";
import FeaturedDecks from "../entities/FeaturedDecks";

export interface IFeaturedDecksRepository {
  all(): Promise<FeaturedDecks[]>;
  filter(data: IListFeaturedDecks): Promise<FeaturedDecks[]>;
  create(data: ICreateFeaturedDecks): Promise<void>;
}