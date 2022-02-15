import { Request, Response } from "express";
import { container } from "tsyringe";

import logger from "@config/logger";
import AuthenticateUserUseCases from "../authenticateUser/AuthenticateUserUseCases";
import ActivateUserUseCases from "./ActivateUserUseCases";

export default class ActivateUserController {
   async handle(request: Request, response: Response): Promise<Response> {
      try {
         const { token } = request.body;

         const activateUserUseCases = container.resolve(ActivateUserUseCases);
         const user = await activateUserUseCases.execute({ token });

         const { password, email } = user

         const authenticateUserUseCases = container.resolve(AuthenticateUserUseCases);
         const responseUser = await authenticateUserUseCases.execute({ password, email });

         return response.status(200).send(responseUser);
      } catch (error) {
        logger.error(`[ActivateUserController] ${error.message}`)
        return response.status(error.statusCode).json({ error: error.message });
      }
   }
}