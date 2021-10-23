import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IUpdateProfileUserDTO from "@modules/accounts/dtos/IUpdateProfileUserDTO";

@injectable()
export default class UpdateProfileUserUseCases {
   constructor(
      @inject("UserRepository")
      private userRepository: IUsersRepository
   ) {}

   async execute({ id, name }:IUpdateProfileUserDTO): Promise<void> {
      this.userRepository.update({ id, name });  
   }
}