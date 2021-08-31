import Deck from "@modules/decks/entities/Deck";

export default interface ICreateCardsDTO {
   deck: Deck;   
   content: string;   
   secretContent: string;   
}