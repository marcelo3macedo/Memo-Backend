import Category from "@modules/categories/entities/Category";
import Deck from "@modules/decks/entities/Deck";

export default interface ICreateCategoriesDeckDTO {
   category: Category;
   deck: Deck;
}