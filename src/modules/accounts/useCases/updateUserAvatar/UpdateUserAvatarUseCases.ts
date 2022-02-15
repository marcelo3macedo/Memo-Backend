import { inject, injectable } from "tsyringe";

import IUpdateUserAvatarDTO from "@modules/accounts/dtos/IUpdateUserAvatarDTO";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

@injectable()
export default class UpdateUserAvatarUseCases {
   constructor(
       @inject("UserRepository")
       private userRepository: IUsersRepository,
       @inject("StorageProvider")
       private storageProvider: IStorageProvider
   ) {}

   async execute({ userId, avatarFile }: IUpdateUserAvatarDTO): Promise<void> {
       const user = await this.userRepository.findById(userId);

       await this.storageProvider.save(avatarFile, "avatar");

       if (user.avatar) {
           await this.storageProvider.delete(user.avatar, "avatar");
       }

       user.avatar = avatarFile;

       await this.userRepository.create(user);
   }
}