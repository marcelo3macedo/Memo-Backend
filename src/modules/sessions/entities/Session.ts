import { Column, CreateDateColumn, Entity, PrimaryColumn, OneToOne, JoinColumn, JoinTable, ManyToMany, DeleteDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import Card from '@modules/cards/entities/Card';
import Deck from '@modules/decks/entities/Deck';

@Entity('sessions')
export default class Session {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @OneToOne(() => Deck)
  @JoinColumn()
  deck: Deck;

  @ManyToMany(() => Card, { cascade: true })
  @JoinTable()
  cards: Card[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  finishedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor() {
    this.id = uuid();
  }
}