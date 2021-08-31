import { Router } from 'express';

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ListReviewController } from '@modules/review/useCases/listReview/ListReviewController';

const reviewRoutes = Router();

const listReviewController = new ListReviewController();

reviewRoutes.use(ensureAuthenticate);
reviewRoutes.get('/', listReviewController.handle);

export { reviewRoutes };