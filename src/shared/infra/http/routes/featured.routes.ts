import { Router } from 'express';
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateFeaturedController } from '@modules/featured/useCases/createFeatured/CreateFeaturedController';

const featuredRoutes = Router();

const featuredDecksController = new CreateFeaturedController();

featuredRoutes.use(ensureAuthenticate);
featuredRoutes.post('/', featuredDecksController.handle);

export { featuredRoutes };