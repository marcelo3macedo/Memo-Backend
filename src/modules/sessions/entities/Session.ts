import Card from '@modules/cards/entities/Card';
import Deck from '@modules/decks/entities/Deck';
import { Column, CreateDateColumn, Entity, PrimaryColumn, OneToOne, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { v4 as uuid } from 'uuid';

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

  @Column()
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  finishedAt: Date;

  constructor() {
    this.id = uuid();
  }
}