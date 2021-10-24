import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IProfileUserDTO from "@modules/accounts/dtos/IProfileUserDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import IUserResponseDTO from "@modules/accounts/dtos/IUserResponseDTO";

@injectable()
export default class ProfileUserUseCases {
   constructor(
      @inject("UserRepository")
      private userRepository: IUsersRepository
   ) {}

   async execute({ id }:IProfileUserDTO): Promise<IUserResponseDTO> {
      const user = await this.userRepository.findById(id);
      
      if (!user) {
         return;
      }
      
      return UserMap.toDTO(user);      
   }
}