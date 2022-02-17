import { Router } from 'express';
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ListDecksController } from '@modules/decks/useCases/listDecks/ListDecksController';
import { PersonalDecksController } from '@modules/decks/useCases/personalDecks/PersonalDecksController';
import { IndexDecksController } from '@modules/decks/useCases/indexDecks/IndexDecksController';
import { CreateDecksController } from '@modules/decks/useCases/createDecks/CreateDecksController';
import { RemoveDecksController } from '@modules/decks/useCases/removeDecks/RemoveDecksController';
import { CloneDecksController } from '@modules/decks/useCases/cloneDecks/CloneDecksController';
import { OptionDecksController } from '@modules/decks/useCases/optionDecks/OptionDecksController';
import { UpdateDecksController } from '@modules/decks/useCases/updateDecks/UpdateDecksController';

const decksRoutes = Router();

const listDecksController = new ListDecksController();
const personalDecksController = new PersonalDecksController();
const indexDecksController = new IndexDecksController();
const createDecksController = new CreateDecksController();
const updateDecksController = new UpdateDecksController();
const removeDecksController = new RemoveDecksController();
const cloneDecksController = new CloneDecksController();
const optionDecksController = new OptionDecksController();

decksRoutes.use(ensureAuthenticate);
decksRoutes.get('/', listDecksController.handle);
decksRoutes.post('/', createDecksController.handle);
decksRoutes.get('/personal', personalDecksController.handle);
decksRoutes.get('/options', optionDecksController.handle);
decksRoutes.get('/:deckId', indexDecksController.handle);
decksRoutes.put('/:deckId', updateDecksController.handle);
decksRoutes.delete('/:deckId', removeDecksController.handle);
decksRoutes.get('/clone/:deckId', cloneDecksController.handle);

export { decksRoutes };