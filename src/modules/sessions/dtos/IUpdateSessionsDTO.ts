import Card from "@modules/sessions/entities/Card";

export default interface IUpdateSessionsDTO {
   cards: Card[];
   sessionId: string;
   userId: string;
}