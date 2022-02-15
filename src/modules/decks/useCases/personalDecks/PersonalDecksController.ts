import { Request, Response } from 'express';
import ValueManager from "../../../../lib/ValueManager";
import { container } from 'tsyringe';

import { PersonalDecksUseCase } from './PersonalDecksUseCase';
import logger from '@config/logger';

export class PersonalDecksController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const { name, page } = request.query;

      const personalDecksUseCase = container.resolve(PersonalDecksUseCase);
      const decks = await personalDecksUseCase.execute({ 
        userId, 
        name: name as any, 
        page: ValueManager.toInteger(page)
      });

      return response.json(decks);
    } catch (error) {
      logger.error(`[PersonalDecksController] ${error.message}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}