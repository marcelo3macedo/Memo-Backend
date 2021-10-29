import { Router } from 'express';
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ListDifficultiesController } from '@modules/difficulties/useCases/listDifficulties/ListDifficultiesController';
import { RemoveDifficultiesController } from '@modules/difficulties/useCases/removeDifficulties/RemoveDifficultiesController';
import { CreateDifficultiesController } from '@modules/difficulties/useCases/createDifficulties/CreateDifficultiesController';

const difficultiesRoutes = Router();

const createDifficultiesController = new CreateDifficultiesController();
const listDifficultiesController = new ListDifficultiesController();
const removeDifficultiesController = new RemoveDifficultiesController();

difficultiesRoutes.use(ensureAuthenticate);
difficultiesRoutes.get('/', listDifficultiesController.handle);
difficultiesRoutes.post('/', createDifficultiesController.handle);
difficultiesRoutes.delete('/:difficultyId', removeDifficultiesController.handle);

export { difficultiesRoutes };