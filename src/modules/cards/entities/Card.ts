import { Column, CreateDateColumn, Entity, PrimaryColumn, OneToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
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

  @Column()
  difficultyFactor: number;

  @OneToOne(() => Deck)
  @JoinColumn()
  deck: Deck;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor() {
    this.id = uuid();
  }
}