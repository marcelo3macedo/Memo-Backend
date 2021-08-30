import { Request, Response } from "express";
import { container } from "tsyringe";
import AuthenticateUseCases from "./AuthenticateUseCases";

export default class AuthenticateUserController {
   async handle(request: Request, response: Response): Promise<Response> {
      const { password, email } = request.body;

      const authenticateUseCases = container.resolve(AuthenticateUseCases);
      const responseUser = await authenticateUseCases.execute({ password, email });

      return response.json(responseUser);
   }
}