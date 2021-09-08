import { Column, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import Deck from "@modules/decks/entities/Deck";
import FeaturedType from './FeaturedType';

@Entity('featured_decks')
export default class FeaturedDecks {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => Deck)
  @JoinColumn()
  deck: Deck;

  @OneToOne(() => FeaturedType)
  @JoinColumn()
  type: FeaturedType;

  @Column()
  active: boolean;

  constructor() {
    this.id = uuid();
  }
}