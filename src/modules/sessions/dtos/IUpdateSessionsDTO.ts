import Session from "../entities/Session";

export default interface IUpdateSessionsDTO {
   session: Session;
   finished_at: string;
}