import { IndexCategoriesUseCase } from '@modules/categories/useCases/indexCategories/IndexCategoriesUseCase';
import { IndexDecksUseCase } from '@modules/decks/useCases/indexDecks/IndexDecksUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCategoriesDeckUseCase } from './CreateCategoriesDeckUseCase';

export class CreateCategoriesDeckController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { categoryId } = request.params;
      const { decks } = request.body;

      const indexCategoriesUseCase = container.resolve(IndexCategoriesUseCase);
      const category = await indexCategoriesUseCase.execute({ categoryId });
      
      const indexDecksUseCase = container.resolve(IndexDecksUseCase);
      const createCategoriesDeckUseCase = container.resolve(CreateCategoriesDeckUseCase);
        
      await decks.map(async (d) =>  {
        let deck = await indexDecksUseCase.execute({ deckId: d.id, isPublic: true });
        
        await createCategoriesDeckUseCase.execute({ category, deck });
      });
      
      return response.status(200).json();
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}