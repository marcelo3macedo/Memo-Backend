import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListDecksUseCase } from './ListDecksUseCase';
import logger from '@config/logger';
import ValueManager from "@lib/ValueManager";

export class ListDecksController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const userId = request['user'].id;
      const { isPublic, name, page } = request.query;

      const listDecksUseCase = container.resolve(ListDecksUseCase);
      const decks = await listDecksUseCase.execute({ 
        userId, 
        name: name as any, 
        isPublic: !!isPublic,
        page: ValueManager.toInteger(page)
      });

      return response.json(decks);
    } catch (error) {
      logger.error(`[ListDecksController] ${error.message}`)
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}