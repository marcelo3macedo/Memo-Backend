
import { inject, injectable } from "tsyringe";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IActivateUsersDTO from "@modules/accounts/dtos/IActivateUsersDTO";
import { AppError } from "@shared/errors/AppError";
import Users from "@modules/accounts/entities/Users";

@injectable()
export default class ActivateUserUseCases {
   constructor(
      @inject("UserRepository")
      private usersRepository: IUsersRepository
   ) {}

   async execute({ token }:IActivateUsersDTO): Promise<Users> {    
      const user = await this.usersRepository.findByToken({ authToken: token });
      
      if (!user) {
         throw new AppError("User not Found", 401)
      }

      await this.usersRepository.active({ id: user.id })

      return user
   }
}