import { Router } from 'express';
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ListDifficultiesController } from '@modules/difficulties/useCases/listDifficulties/ListDifficultiesController';
import { RemoveDifficultiesController } from '@modules/difficulties/useCases/removeDifficulties/RemoveDifficultiesController';

const difficultiesRoutes = Router();

const listDifficultiesController = new ListDifficultiesController();
const removeDifficultiesController = new RemoveDifficultiesController();

difficultiesRoutes.use(ensureAuthenticate);
difficultiesRoutes.get('/', listDifficultiesController.handle);
difficultiesRoutes.delete('/:difficultyId', removeDifficultiesController.handle);

export { difficultiesRoutes };