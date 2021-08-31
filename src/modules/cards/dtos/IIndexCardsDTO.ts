import Deck from "@modules/decks/entities/Deck";

export default interface IIndexCardsDTO {
   deck: Deck;   
   cardId: string;
}