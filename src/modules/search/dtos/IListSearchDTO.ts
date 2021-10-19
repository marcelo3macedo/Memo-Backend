import Category from "@modules/categories/entities/Category";
import Deck from "@modules/decks/entities/Deck";
import FeaturedDecks from "@modules/featured/entities/FeaturedDecks";

export default interface IListSearchDTO {
   categories: Category[];
   featured: FeaturedDecks[];
   decks: Deck[];
}