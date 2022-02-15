import logger from "@config/logger";
import { Request, Response } from "express";
import { container } from "tsyringe";
import UpdateUserAvatarUseCases from "./UpdateUserAvatarUseCases";

class UpdateUserAvatarController {
   async handle(request: Request, response: Response): Promise<Response> {
      try {
         const userId = request['user'].id;
         const updateUserAvatarUseCases = container.resolve(UpdateUserAvatarUseCases);
         const avatarFile = request.file.filename;
 
         await updateUserAvatarUseCases.execute({ userId, avatarFile });

        return response.status(204).send();
      } catch (error) {
         logger.error(`[UpdateUserAvatarController] ${error.message}`)
         return response.status(error.statusCode).json({ error: error.message });
      }
   }
}

export default UpdateUserAvatarController;