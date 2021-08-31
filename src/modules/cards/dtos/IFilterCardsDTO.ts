import Card from "../entities/Card";

export default interface IListCardsDTO {
   deckId: string;   
   cards?: Card[];
   limit: number;
}