import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export default class Users {
   @PrimaryColumn()
   id: string;

   @Column()
   name: string;

   @Column()
   password: string;

   @Column()
   email: string;

   @Column()
   isAdmin: boolean;

   @Column()
   avatar: string;

   @CreateDateColumn()
   createdAt: Date;

   constructor() {
      if (!this.id) {
         this.id = uuid();
      }
   }
}