import Deck from "@modules/decks/entities/Deck";

export default interface IIndexSessionsDeckDTO {
   userId: string;
   deck: Deck;
}