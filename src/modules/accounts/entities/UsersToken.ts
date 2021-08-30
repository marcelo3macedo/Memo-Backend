import { Column, CreateDateColumn, Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import User from "./Users";

@Entity("users_tokens")
export default class UsersToken {
   @PrimaryColumn()
   id: string;

   @Column()
   refreshToken: string;

   @Column()
   userId: string;

   @ManyToOne(() => User)
   @JoinColumn()
   user: User;

   @Column()
   expiresDate: Date;

   @CreateDateColumn()
   createdAt: Date;

   constructor() {
      if (!this.id) {
         this.id = uuid();
      }
   }
}