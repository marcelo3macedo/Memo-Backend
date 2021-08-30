import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import Card from "@modules/cards/entities/Card";
@Entity('decks')
export default class Deck {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  userId: string;

  @Column()
  imageId: Number;

  @Column()
  active: boolean;

  @OneToMany(() => Card, (card: Card) => card.deck)
  cards: Card[];

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    this.id = uuid();
  }
}