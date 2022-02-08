import { Request, Response } from 'express';
import { container } from 'tsyringe';
import logger from '@config/logger';

import { OptionDecksUseCase } from './OptionDecksUseCase';

export class OptionDecksController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const optionDecksUseCase = container.resolve(OptionDecksUseCase);
      const options = await optionDecksUseCase.execute();
            
      return response.json(options);
    } catch (error) {
      logger.error(`[OptionDecksController] ${error}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}