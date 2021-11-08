import Deck from "@modules/decks/entities/Deck";
import Card from "../entities/Card";

export default interface IListCardsDTO {
   deck: Deck;
   cards?: Card[];
   limit: number;
}