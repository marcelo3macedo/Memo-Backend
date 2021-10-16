import Deck from "@modules/decks/entities/Deck";

export default interface ICreateCardsDTO {
   deck: Deck;
   title: string;
   content: string;   
   secretContent: string;   
}