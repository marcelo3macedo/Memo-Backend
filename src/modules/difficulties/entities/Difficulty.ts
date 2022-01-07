import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('difficulty')
export default class Difficulty {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  factor: number;
  
  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor() {
    this.id = uuid();
  }
}