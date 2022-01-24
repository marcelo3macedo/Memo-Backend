import logger from "@config/logger";
import { Request, Response } from "express";
import { container } from "tsyringe";
import SendForgotPasswordMailUseCases from "./SendForgotPasswordMailUseCases";

class SendForgotPasswordMailController {
   async handle(request: Request, response: Response): Promise<Response> {
      try {
        const { email } = request.body; 
        const sendForgotPasswordMailUseCases = container.resolve(SendForgotPasswordMailUseCases);

        await sendForgotPasswordMailUseCases.execute({ email });

        return response.send(200)
      } catch (error) {
         logger.error(`[SendForgotPasswordMailController] ${error}`)
         return response.status(error.statusCode).json({ error: error.message });
      }
   }
}

export default SendForgotPasswordMailController;