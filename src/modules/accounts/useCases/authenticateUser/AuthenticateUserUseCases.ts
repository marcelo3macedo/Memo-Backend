
import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IUsersTokenRepository from "@modules/accounts/repositories/IUsersTokenRepository";
import IAuthenticateUsersDTO from "@modules/accounts/dtos/IAuthenticateUsersDTO";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

import { EMAIL_OR_PASSWORD_INCORRECT, VALIDATION_REQUIRED } from "@constants/logger";

@injectable()
export default class AuthenticateUserUseCases {
   constructor(
      @inject("UserRepository")
      private usersRepository: IUsersRepository,
      @inject("UserTokenRepository")
      private usersTokenRepository: IUsersTokenRepository,
      @inject("DaysDateProvider")
      private dateProvider: IDateProvider
   ) {}

   async execute({ email, password }: IAuthenticateUsersDTO): Promise<any> {
      const user = await this.usersRepository.findByEmail(email);
      const { secret, secretRefreshToken, expiresIn, expiresInRefreshToken, expiresInRefreshTokenDays } = auth;

      if (!user) {
         throw new AppError(EMAIL_OR_PASSWORD_INCORRECT, 401);
      }

      if (!user.validated) {
         throw new AppError(VALIDATION_REQUIRED, 401);
      }

      const passwordMatch = await compare(password, user.password) || (password === user.password);

      if (!passwordMatch) {
         throw new AppError(EMAIL_OR_PASSWORD_INCORRECT, 401);
      }

      const token = sign({}, secret, {
         subject: user.id,
         expiresIn: expiresIn,
      });

      const refreshToken = sign({ email }, secretRefreshToken, {
         subject: user.id,
         expiresIn: expiresInRefreshToken,
      });

      const refreshTokenExpiresDate = this.dateProvider.addDays(expiresInRefreshTokenDays);

      await this.usersTokenRepository.create({
         userId: user.id,
         expiresDate: refreshTokenExpiresDate,
         refreshToken
      })

      const returnData = {
         token,
         user: {
            name: user.name,
            email: user.email,
         },
         refreshToken
      };

      return returnData;
   }
}