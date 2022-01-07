import { v4 as uuid } from 'uuid';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Card from "@modules/cards/entities/Card";
import Frequency from '@modules/frequencies/entities/Frequency';

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

  @Column()
  frequencyId: string;  

  @ManyToOne(type => Deck, deck => deck.children)
  parent: Deck;

  @OneToMany(type => Deck, deck => deck.parent)
  children: Deck[];

  @OneToMany(() => Card, (card: Card) => card.deck)
  cards: Card[];

  @ManyToOne(type => Frequency, frequency => frequency.id)
  frequency: Frequency;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  reviewAt: Date;

  owner: boolean;

  constructor() {
    this.id = uuid();
  }
}