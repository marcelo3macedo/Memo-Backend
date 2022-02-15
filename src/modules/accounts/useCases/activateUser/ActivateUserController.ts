import logger from "@config/logger";
import { Request, Response } from "express";
import { container } from "tsyringe";
import AuthenticateUseCases from "../authenticateUser/AuthenticateUseCases";
import ActivateUserUseCases from "./ActivateUserUseCases";

export default class ActivateUserController {
   async handle(request: Request, response: Response): Promise<Response> {
      try {
         const { token } = request.body;

         const activateUserUseCases = container.resolve(ActivateUserUseCases);
         const user = await activateUserUseCases.execute({ token });

         const { password, email } = user

         const authenticateUseCases = container.resolve(AuthenticateUseCases);
         const responseUser = await authenticateUseCases.execute({ password, email });

         return response.status(200).send(responseUser);
      } catch (error) {
        logger.error(`[ActivateUserController] ${error}`)
        return response.status(error.statusCode).json({ error: error.message });
      }
   }
}