import { Router } from 'express';
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ListCardsController } from '@modules/cards/useCases/listCards/ListCardsController';
import { IndexCardsController } from '@modules/cards/useCases/indexCards/IndexCardsController';
import { CreateCardsController } from '@modules/cards/useCases/createCards/CreateCardsController';
import { UpdateCardsController } from '@modules/cards/useCases/updateCards/UpdateCardsController';
import { RemoveCardsController } from '@modules/cards/useCases/removeCards/RemoveCardsController';

const cardsRoutes = Router();

const listCardsController = new ListCardsController();
const createCardsController = new CreateCardsController();
const indexCardsController = new IndexCardsController();
const updateCardsController = new UpdateCardsController();
const removeCardsController = new RemoveCardsController();

cardsRoutes.use(ensureAuthenticate);
cardsRoutes.get('/:deckId', listCardsController.handle);
cardsRoutes.get('/:deckId/:cardId', indexCardsController.handle);
cardsRoutes.post('/:deckId', createCardsController.handle);
cardsRoutes.put('/:cardId', updateCardsController.handle);
cardsRoutes.delete('/:cardId', removeCardsController.handle);

export { cardsRoutes };