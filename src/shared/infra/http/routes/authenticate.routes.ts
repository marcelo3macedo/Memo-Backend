import { Router } from "express";

const authenticateRoute = Router();

import AuthenticateUserController from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import RefreshTokenController from "@modules/accounts/useCases/refreshToken/RefreshTokenController";
import ActivateUserController from "@modules/accounts/useCases/activateUser/ActivateUserController";

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const activateUserController = new ActivateUserController();

authenticateRoute.post("/session", authenticateUserController.handle);
authenticateRoute.post("/refresh-token", refreshTokenController.handle);
authenticateRoute.post("/activate", activateUserController.handle);

export { authenticateRoute };