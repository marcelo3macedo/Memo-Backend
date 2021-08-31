import Card from "@modules/cards/entities/Card";
import Deck from "@modules/decks/entities/Deck";

export default interface IListSessionsDTO {
   userId: string;
   deck: Deck;
   cards: Card[];
}