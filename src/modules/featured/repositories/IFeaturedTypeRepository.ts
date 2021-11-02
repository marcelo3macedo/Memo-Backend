import IIndexFeaturedTypeDTO from "../dtos/IIndexFeaturedTypeDTO";
import IRemoveFeaturedTypeDTO from "../dtos/IRemoveFeaturedTypeDTO";
import FeaturedType from "../entities/FeaturedType";

export interface IFeaturedTypeRepository {
  all(): Promise<FeaturedType[]>;
  find(data: IIndexFeaturedTypeDTO): Promise<FeaturedType>;
  remove(data: IRemoveFeaturedTypeDTO): Promise<void>;
}