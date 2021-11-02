import { v4 as uuid } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn, DeleteDateColumn } from 'typeorm';

@Entity('categories')
export default class Category {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  parentId: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor() {
    this.id = uuid();
  }
}