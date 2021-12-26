import { Router } from 'express';
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ListFrequenciesController } from '@modules/frequencies/useCases/listFrequencies/ListFrequenciesController';

const frequenciesRoutes = Router();

const listFrequenciesController = new ListFrequenciesController();

frequenciesRoutes.use(ensureAuthenticate);
frequenciesRoutes.get('/', listFrequenciesController.handle);

export { frequenciesRoutes };