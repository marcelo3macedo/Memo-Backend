import { Router } from 'express';
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ListSearchController } from '@modules/search/useCases/listSearch/ListSearchController';

const searchRoutes = Router();

const listSearchController = new ListSearchController();

searchRoutes.use(ensureAuthenticate);
searchRoutes.get('/', listSearchController.handle);
searchRoutes.get('/:query', listSearchController.handle);

export { searchRoutes };