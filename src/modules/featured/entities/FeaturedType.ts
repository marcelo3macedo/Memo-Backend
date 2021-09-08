import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('featured_type')
export default class FeaturedType {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
  
  @Column()
  active: boolean;

  constructor() {
    this.id = uuid();
  }
}