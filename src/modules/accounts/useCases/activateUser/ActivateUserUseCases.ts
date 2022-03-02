
import { inject, injectable } from "tsyringe";

import Users from "@modules/accounts/entities/Users";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IActivateUsersDTO from "@modules/accounts/dtos/IActivateUsersDTO";
import { AppError } from "@shared/errors/AppError";
import { USER_NOTFOUND } from "@constants/logger";

@injectable()
export default class ActivateUserUseCases {
   constructor(
      @inject("UserRepository")
      private usersRepository: IUsersRepository
   ) {}

   async execute({ token }:IActivateUsersDTO): Promise<Users> {    
      const user = await this.usersRepository.findByToken({ authToken: token });
      
      if (!user) {
         throw new AppError(USER_NOTFOUND, 401)
      }

      await this.usersRepository.active({ id: user.id })

      return user
   }
}