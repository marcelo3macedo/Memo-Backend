import logger from "@config/logger";
import { Request, Response } from "express";
import { container } from "tsyringe";
import ProfileUserUseCases from "./ProfileUserUseCases";

class ProfileUserController {
   async handle(request: Request, response: Response): Promise<Response> {
      try {
         const { id } = request.user;

         const profileUserUseCases = container.resolve(ProfileUserUseCases);
         const user = await profileUserUseCases.execute({ id });

         return response.json(user);
      } catch (error) {
         logger.error(`[ProfileUserController] ${error}`)
         return response.status(error.statusCode).json({ error: error.message });
      }
   }
}

export default ProfileUserController;