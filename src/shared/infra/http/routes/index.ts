import { Router } from 'express';

import authenticateRoute from "./authenticate.routes";
import { usersRoute } from "./users.routes";
import { decksRoutes } from './decks.routes';

const router = Router();

router.use('/decks', decksRoutes);
router.use('/users', usersRoute);
router.use(authenticateRoute);

export { router };