
import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ListSessionsController } from '@modules/sessions/useCases/listSessions/ListSessionsController';
import { CreateSessionsController } from '@modules/sessions/useCases/createSessions/CreateSessionsController';
import { IndexSessionsController } from '@modules/sessions/useCases/indexSessions/IndexSessionsController';
import { RemoveSessionsController } from '@modules/sessions/useCases/removeSessions/RemoveSessionsController';
import { FeedSessionsController } from "@modules/sessions/useCases/feedSessions/FeedSessionsController";
import { UpdateSessionsController } from "@modules/sessions/useCases/updateSessions/UpdateSessionsController";

const sessionsRoute = Router();

const listSessionsController = new ListSessionsController();
const createSessionsController = new CreateSessionsController();
const updateSessionsController = new UpdateSessionsController();
const indexSessionsController = new IndexSessionsController();
const feedSessionsController = new FeedSessionsController();
const removeSessionsController = new RemoveSessionsController();

sessionsRoute.use(ensureAuthenticate);

sessionsRoute.get('/', listSessionsController.handle);
sessionsRoute.get('/feed/:deckId', feedSessionsController.handle);
sessionsRoute.get('/:sessionId', indexSessionsController.handle);
sessionsRoute.put('/:sessionId', updateSessionsController.handle);
sessionsRoute.post('/:deckId', createSessionsController.handle);
sessionsRoute.delete('/:sessionId', removeSessionsController.handle);

export default sessionsRoute;