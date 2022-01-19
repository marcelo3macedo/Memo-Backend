import { getRepository, Repository } from "typeorm";
import Users from "../../entities/Users";
import IUsersRepository from "../IUsersRepository";
import ICreateUsersDTO from "../../dtos/ICreateUsersDTO";
import IUpdateProfileUserDTO from "@modules/accounts/dtos/IUpdateProfileUserDTO";

class UserRepository implements IUsersRepository {
   private repository: Repository<Users>;

   constructor() {
      this.repository = getRepository(Users);
   }

   async findById(id: string): Promise<Users> {
      const user = await this.repository.findOne(id);
      return user!;
   }

   async findByEmail(email: string): Promise<Users> {
      const user = await this.repository.findOne({ email });
      return user!;
   }

   async findByToken({ authToken }): Promise<Users> {
      const user = await this.repository.findOne({ authToken });
      return user!;
   }

   async create({ name, email, password, id, avatar, authToken }: ICreateUsersDTO): Promise<void> {
      const user = this.repository.create({
         name,
         email,
         password,
         id,
         avatar,
         authToken
      });

      await this.repository.save(user);
   }

   async update({ id, name }: IUpdateProfileUserDTO): Promise<void> {
      const profile = {
         name
       }
   
       this.repository.update({ id }, profile);
   }

   async active({ id }): Promise<void> {
      await this.repository.update({ id }, { validated: true });
   }
}

export default UserRepository;