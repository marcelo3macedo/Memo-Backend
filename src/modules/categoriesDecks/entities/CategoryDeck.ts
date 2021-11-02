import { CreateDateColumn, Entity, PrimaryColumn, DeleteDateColumn } from 'typeorm';

@Entity('categories_decks')
export default class CategoryDeck {
  @PrimaryColumn()
  categoryId: string;

  @PrimaryColumn()
  deckId: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}