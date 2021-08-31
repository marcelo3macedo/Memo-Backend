import Session from "@modules/sessions/entities/Session";

export default interface IReviewDTO {
   lastSession: Session,
   sessions: Session[]
}