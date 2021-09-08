import FeaturedDecks from "@modules/featured/entities/FeaturedDecks";
import Session from "@modules/sessions/entities/Session";

export default interface IReviewDTO {
   lastSession: Session,
   sessions: Session[],
   featuredDecks: FeaturedDecks[]
}