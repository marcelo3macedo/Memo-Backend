import { inject, injectable } from "tsyringe";
import IResetPasswordDTO from "@modules/accounts/dtos/IResetPasswordDTO";
import IUsersTokenRepository from "@modules/accounts/repositories/IUsersTokenRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcrypt";

@injectable()
export default class ResetPasswordUseCases {
   constructor(
      @inject("UserTokenRepository")
      private usersTokenRepository: IUsersTokenRepository,
      @inject("DaysDateProvider")
      private dateProvider: IDateProvider,
      @inject("UserRepository")
      private usersRepository: IUsersRepository,
   ) {}

   async execute({ refreshToken, password }: IResetPasswordDTO): Promise<void> {
      const userToken = await this.usersTokenRepository.findByRefreshToken({ refreshToken });  
      
      if (!userToken) {
         throw new AppError("User does not exists")
      }

      if (this.dateProvider.compareIfBefore(userToken.expiresDate, this.dateProvider.dateNow())) {
         throw new AppError("Token expired")
      }

      const user = await this.usersRepository.findById(userToken.userId);
      user.password = await hash(password, 8);

      await this.usersRepository.create(user);

      await this.usersTokenRepository.removeById({ id: userToken.id });
   }
}