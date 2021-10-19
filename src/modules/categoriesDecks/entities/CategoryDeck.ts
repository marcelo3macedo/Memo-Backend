import { CreateDateColumn, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity('categories_decks')
export default class CategoryDeck {
  @PrimaryColumn()
  categoryId: string;

  @PrimaryColumn()
  deckId: string;

  @CreateDateColumn()
  createdAt: Date;
}