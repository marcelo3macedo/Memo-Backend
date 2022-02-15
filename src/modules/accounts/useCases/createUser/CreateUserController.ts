import logger from "@config/logger";
import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserUseCases from "./CreateUserUseCases";

class CreateUserController {
   async handle(request: Request, response: Response): Promise<Response> {
      try {
         const { name, email, password } = request.body;

         const createUserUseCase = container.resolve(CreateUserUseCases);

         await createUserUseCase.execute({ name, email, password });

         return response.status(201).send();
      } catch (error) {
         logger.error(`[CreateUserController] ${error}`)
         return response.status(error.statusCode).json({ error: error.message });
      }
   }
}

export default CreateUserController;