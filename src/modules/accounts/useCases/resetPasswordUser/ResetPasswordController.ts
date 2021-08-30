import { Request, Response } from "express";
import { container } from "tsyringe";
import ResetPasswordUseCases from "./ResetPasswordUseCases";

class ResetPasswordController {
   async handle(request: Request, response: Response): Promise<Response> {
      try {
         const { refreshToken } = request.query;
         const { password } = request.body;
         const resetPasswordUseCases = container.resolve(ResetPasswordUseCases);

         await resetPasswordUseCases.execute({ refreshToken:refreshToken.toString(), password });

         return response.send(200);
      } catch (error) {
         return response.status(error.statusCode).json({ error: error.message });
      }
   }
}

export default ResetPasswordController;