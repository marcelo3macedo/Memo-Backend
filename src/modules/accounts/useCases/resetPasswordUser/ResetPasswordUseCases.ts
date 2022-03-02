import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import IResetPasswordDTO from "@modules/accounts/dtos/IResetPasswordDTO";
import IUsersTokenRepository from "@modules/accounts/repositories/IUsersTokenRepository";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

import { TOKEN_EXPIRED, USER_NOTFOUND } from "@constants/logger";

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
         throw new AppError(USER_NOTFOUND)
      }

      if (this.dateProvider.compareIfBefore(userToken.expiresDate, this.dateProvider.dateNow())) {
         throw new AppError(TOKEN_EXPIRED)
      }

      const user = await this.usersRepository.findById(userToken.userId);
      user.password = await hash(password, 8);

      await this.usersRepository.create(user);

      await this.usersTokenRepository.removeById({ id: userToken.id });
   }
}