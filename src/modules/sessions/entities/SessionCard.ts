import { Column, Entity, PrimaryColumn, DeleteDateColumn } from 'typeorm';

@Entity('sessions_cards_cards')
export default class SessionCard {
  @PrimaryColumn()
  sessionsId: string;

  @PrimaryColumn()
  cardsId: string;

  @Column()
  difficultyId: string;

  @Column()
  answeredAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}