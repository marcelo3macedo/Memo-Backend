import { Router } from 'express';

import authenticateRoute from "./authenticate.routes";
import { decksRoutes } from './decks.routes';

const router = Router();

router.use('/decks', decksRoutes);
router.use(authenticateRoute);

export { router };