import { Router } from "express";

const authenticateRoute = Router();

import AuthenticateUserController from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import RefreshTokenController from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoute.post("/session", authenticateUserController.handle);
authenticateRoute.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoute };