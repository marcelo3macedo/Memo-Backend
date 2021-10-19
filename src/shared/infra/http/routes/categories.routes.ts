import { Router } from 'express';
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ListCategoriesController } from '@modules/categories/useCases/listCategories/ListCategoriesController';
import { CreateCategoriesController } from '@modules/categories/useCases/createCategories/CreateCategoriesController';
import { CreateCategoriesDeckController } from '@modules/categoriesDecks/useCases/CreateCategoriesDeck/CreateCategoriesDeckController';
import { IndexCategoriesController } from '@modules/categories/useCases/indexCategories/IndexCategoriesController';

const categoriesRoutes = Router();

const listCategoriesController = new ListCategoriesController();
const createCategoriesController = new CreateCategoriesController();
const createCategoriesDeckController = new CreateCategoriesDeckController();
const indexCategoriesController = new IndexCategoriesController();

categoriesRoutes.use(ensureAuthenticate);
categoriesRoutes.get('/', listCategoriesController.handle);
categoriesRoutes.post('/', createCategoriesController.handle);
categoriesRoutes.get('/:categoryId', indexCategoriesController.handle);
categoriesRoutes.post('/:categoryId/decks', createCategoriesDeckController.handle);

export { categoriesRoutes };