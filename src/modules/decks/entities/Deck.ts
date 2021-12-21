import { v4 as uuid } from 'uuid';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
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
  clonedBy: string;

  @Column()
  isPublic: boolean;

  @ManyToOne(type => Deck, deck => deck.children)
  parent: Deck;

  @OneToMany(type => Deck, deck => deck.parent)
  children: Deck[];

  @OneToMany(() => Card, (card: Card) => card.deck)
  cards: Card[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  owner: boolean;

  constructor() {
    this.id = uuid();
  }
}