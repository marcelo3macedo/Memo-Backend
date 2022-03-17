import Deck from "@modules/decks/entities/Deck";

export default interface ICreateFeaturedDecksDTO {
   deck?: Deck;
   deckId?: string;
}