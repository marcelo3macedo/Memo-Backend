import Session from "../entities/Session";

export default interface IUpdateSessionsDTO {
   session?: Session;
   sessionId: string;
   userId: string;
   finished_at: string;
}