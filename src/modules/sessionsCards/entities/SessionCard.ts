import { Column, CreateDateColumn, Entity, PrimaryColumn, OneToOne, JoinColumn, JoinTable, ManyToMany, OneToMany } from 'typeorm';

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
}