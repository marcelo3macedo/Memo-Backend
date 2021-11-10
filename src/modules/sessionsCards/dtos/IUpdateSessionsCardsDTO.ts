import SessionCard from "../entities/SessionCard";

export default interface IUpdateSessionsCardsDTO {
   cards?: any[];
   sessionId?: string;
   sessionCard?: SessionCard;
}