import { Router } from 'express';
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ListCategoriesController } from '@modules/categories/useCases/listCategories/ListCategoriesController';
import { CreateCategoriesController } from '@modules/categories/useCases/createCategories/CreateCategoriesController';

const categoriesRoutes = Router();

const listCategoriesController = new ListCategoriesController();
const createCategoriesController = new CreateCategoriesController();

categoriesRoutes.use(ensureAuthenticate);
categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.post('/', createCategoriesController.handle);

export { categoriesRoutes };