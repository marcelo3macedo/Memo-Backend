import { Router } from 'express';

import { authenticateRoute } from "./authenticate.routes";
import { cardsRoutes } from "./cards.routes";
import { categoriesRoutes } from "./categories.routes";
import { decksRoutes } from './decks.routes';
import { difficultiesRoutes } from "./difficulties.routes";
import { featuredRoutes } from "./featured.routes";
import { frequenciesRoutes } from "./frequencies.routes";
import { passwordRoutes } from './password.routes';
import { reviewRoutes } from './review.routes';
import { searchRoutes } from "./search.routes";
import sessionsRoute from "./sessions.routes";
import { usersRoute } from "./users.routes";

const router = Router();

router.use(authenticateRoute);
router.use('/cards', cardsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/decks', decksRoutes);
router.use('/difficulties', difficultiesRoutes);
router.use('/featured', featuredRoutes);
router.use('/frequencies', frequenciesRoutes);
router.use('/password', passwordRoutes);
router.use('/review', reviewRoutes);
router.use('/search', searchRoutes);
router.use('/sessions', sessionsRoute);
router.use('/users', usersRoute);


export { router };