import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

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

  cards: [];

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    this.id = uuid();
  }
}