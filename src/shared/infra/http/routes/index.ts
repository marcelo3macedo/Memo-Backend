import { Router } from 'express';

import sessionsRoute from "./sessions.routes";
import { authenticateRoute } from "./authenticate.routes";
import { decksRoutes } from './decks.routes';
import { cardsRoutes } from "./cards.routes";
import { passwordRoutes } from './password.routes';
import { reviewRoutes } from './review.routes';
import { usersRoute } from "./users.routes";
import { featuredRoutes } from "./featured.routes";
import { categoriesRoutes } from "./categories.routes";
import { searchRoutes } from "./search.routes";

const router = Router();

router.use(authenticateRoute);
router.use('/decks', decksRoutes);
router.use('/cards', cardsRoutes);
router.use('/featured', featuredRoutes);
router.use('/users', usersRoute);
router.use('/sessions', sessionsRoute);
router.use('/password', passwordRoutes);
router.use('/review', reviewRoutes);
router.use('/categories', categoriesRoutes);
router.use('/search', searchRoutes);

export { router };