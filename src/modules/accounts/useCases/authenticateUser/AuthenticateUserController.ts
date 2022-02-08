import logger from "@config/logger";
import { Request, Response } from "express";
import { container } from "tsyringe";
import AuthenticateUseCases from "./AuthenticateUseCases";

export default class AuthenticateUserController {
   async handle(request: Request, response: Response): Promise<Response> {
      try {
         const { password, email } = request.body;

         const authenticateUseCases = container.resolve(AuthenticateUseCases);
         const responseUser = await authenticateUseCases.execute({ password, email });

         return response.json(responseUser);
      } catch (error) {
        logger.error(`[AuthenticateUserController] ${error.message}`)
        return response.status(error.statusCode).json({ error: error.message });
      }
   }
}