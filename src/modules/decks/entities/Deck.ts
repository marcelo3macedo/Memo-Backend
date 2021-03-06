import { v4 as uuid } from 'uuid';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Card from "@modules/cards/entities/Card";
import Frequency from '@modules/frequencies/entities/Frequency';
import Category from '@modules/categories/entities/Category';
import Theme from '@modules/themes/entities/Theme';

@Entity('decks')
export default class Deck {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  path: string;

  @Column()
  userId: string;

  @Column()
  clonedBy: string;

  @Column()
  isPublic: boolean;

  @Column()
  frequencyId: string;  

  @Column()
  categoryId: string; 

  @OneToMany(() => Card, (card: Card) => card.deck)
  cards: Card[];

  @ManyToOne(type => Frequency, frequency => frequency.id)
  frequency: Frequency;

  @ManyToOne(type => Category, category => category.id)
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  reviewAt: Date;

  isSaved: boolean;

  constructor() {
    this.id = uuid();
  }
}