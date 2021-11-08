import Deck from "../entities/Deck";

export default interface ICloneDecksDTO {
   deck: Deck;
   userId: string;
}