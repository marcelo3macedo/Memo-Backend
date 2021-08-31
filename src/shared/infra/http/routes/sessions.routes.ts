
import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ListSessionsController } from '@modules/sessions/useCases/listSessions/ListSessionsController';
import { CreateSessionsController } from '@modules/sessions/useCases/createSessions/CreateSessionsController';
import { IndexSessionsController } from '@modules/sessions/useCases/indexSessions/IndexSessionsController';
import { UpdateSessionsController } from '@modules/sessions/useCases/updateSessions/UpdateSessionsController';
import { RemoveSessionsController } from '@modules/sessions/useCases/removeSessions/RemoveSessionsController';
import { UpdateSessionsCardsController } from '@modules/sessionsCards/useCases/updateSessionsCards/UpdateSessionsCardsController';

const sessionsRoute = Router();

const listSessionsController = new ListSessionsController();
const createSessionsController = new CreateSessionsController();
const indexSessionsController = new IndexSessionsController();
const updateSessionsController = new UpdateSessionsController();
const removeSessionsController = new RemoveSessionsController();
const updateSessionsCardsController = new UpdateSessionsCardsController();

sessionsRoute.use(ensureAuthenticate);
sessionsRoute.get('/', listSessionsController.handle);
sessionsRoute.get('/:sessionId', indexSessionsController.handle);
sessionsRoute.put('/:sessionId', updateSessionsController.handle);
sessionsRoute.post('/:deckId', createSessionsController.handle);
sessionsRoute.delete('/:sessionId', removeSessionsController.handle);

sessionsRoute.put('/:sessionId/cards', updateSessionsCardsController.handle);

export default sessionsRoute;