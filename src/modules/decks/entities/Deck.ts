import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
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
  parentId: string;

  @Column()
  imageId: Number;

  @Column()
  active: boolean;

  @OneToMany(() => Deck, (deck: Deck) => deck.parentId)
  decks: Deck[];

  @OneToMany(() => Card, (card: Card) => card.deck)
  cards: Card[];

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    this.id = uuid();
  }
}