import { Column, CreateDateColumn, Entity, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('categories')
export default class Category {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  parentId: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    this.id = uuid();
  }
}