import { Router } from 'express';
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ListDecksController } from '@modules/decks/useCases/listDecks/ListDecksController';
import { IndexDecksController } from '@modules/decks/useCases/indexDecks/IndexDecksController';
import { CreateDecksController } from '@modules/decks/useCases/createDecks/CreateDecksController';
import { RemoveDecksController } from '@modules/decks/useCases/removeDecks/RemoveDecksController';
import { CloneDecksController } from '@modules/decks/useCases/cloneDecks/CloneDecksController';

const decksRoutes = Router();

const listDecksController = new ListDecksController();
const indexDecksController = new IndexDecksController();
const createDecksController = new CreateDecksController();
const removeDecksController = new RemoveDecksController();
const cloneDecksController = new CloneDecksController();

decksRoutes.use(ensureAuthenticate);
decksRoutes.get('/', listDecksController.handle);
decksRoutes.get('/:deckId', indexDecksController.handle);
decksRoutes.post('/', createDecksController.handle);
decksRoutes.delete('/:deckId', removeDecksController.handle);
decksRoutes.get('/clone/:deckId', cloneDecksController.handle);

export { decksRoutes };