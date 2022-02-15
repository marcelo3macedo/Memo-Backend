
import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IUsersTokenRepository from "@modules/accounts/repositories/IUsersTokenRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
   email: string;
   password: string;
}

interface IResponse {
   user: {
      name: string;
      email: string;
   };
   token: string;
   refreshToken: string;
}

@injectable()
export default class AuthenticateUseCases {
   constructor(
      @inject("UserRepository")
      private usersRepository: IUsersRepository,
      @inject("UserTokenRepository")
      private usersTokenRepository: IUsersTokenRepository,
      @inject("DaysDateProvider")
      private dateProvider: IDateProvider
   ) {}

   async execute({ email, password }: IRequest): Promise<IResponse> {
      const user = await this.usersRepository.findByEmail(email);
      const { secret, secretRefreshToken, expiresIn, expiresInRefreshToken, expiresInRefreshTokenDays } = auth;

      if (!user) {
         throw new AppError("Email or password incorrect", 401);
      }

      if (!user.validated) {
         throw new AppError("Validation Required", 401);
      }

      const passwordMatch = await compare(password, user.password) || (password === user.password);

      if (!passwordMatch) {
         throw new AppError("Email or password incorrect", 401);
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

      const returnData: IResponse = {
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