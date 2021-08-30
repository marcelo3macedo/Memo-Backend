import { Expose } from "class-transformer";
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

   @Expose({ name: "avatarUrl" })
   avatarUrl():string {
      switch(process.env.DISK) {
         case "local": 
         return `${process.env.APP_URL}/avatar/${this.avatar}`
         case "s3":
            return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`
         default:
            return null
      }
   }

   constructor() {
      if (!this.id) {
         this.id = uuid();
      }
   }
}