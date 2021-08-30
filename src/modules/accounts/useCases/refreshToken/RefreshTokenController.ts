import { Request, Response } from "express";
import { container } from "tsyringe";
import RefreshTokenUseCases from "./RefreshTokenUseCases";

class RefreshTokenController {
   async handle(request: Request, response: Response): Promise<Response> {
      try {
         const token = request.body.token || request.headers["x-access-token"] || request.query.token;
         const refreshTokenUseCases = container.resolve(RefreshTokenUseCases);

         const refreshToken = await refreshTokenUseCases.execute({ token });

         return response.json(refreshToken);
      } catch (error) {
         return response.status(error.statusCode).json({ error: error.message });
      }
   }
}

export default RefreshTokenController;