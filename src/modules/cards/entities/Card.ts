import { Column, CreateDateColumn, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import Deck from "@modules/decks/entities/Deck";

@Entity('cards')
export default class Card {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  secretContent: string;

  @OneToOne(() => Deck)
  @JoinColumn()
  deck: Deck;

  @Column()
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    this.id = uuid();
  }
}