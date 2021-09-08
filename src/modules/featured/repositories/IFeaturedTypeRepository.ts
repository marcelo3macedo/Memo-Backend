import IIndexFeaturedType from "../dtos/IIndexFeaturedType";
import FeaturedType from "../entities/FeaturedType";

export interface IFeaturedTypeRepository {
  all(): Promise<FeaturedType[]>;
  find(data: IIndexFeaturedType): Promise<FeaturedType>;
}