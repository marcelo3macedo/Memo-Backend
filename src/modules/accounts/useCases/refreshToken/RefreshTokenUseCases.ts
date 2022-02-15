import { inject, injectable } from "tsyringe";
import { verify, sign } from "jsonwebtoken";

import auth from "@config/auth";
import IUsersTokenRepository from "@modules/accounts/repositories/IUsersTokenRepository";
import IRefreshTokenDTO from "@modules/accounts/dtos/IRefreshTokenDTO";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import ITokenResponseDTO from "@modules/accounts/dtos/ITokenResponseDTO";

interface IPayload {
   sub: string;
   email: string;
}

@injectable()
export default class RefreshTokenUseCases {
   constructor(
      @inject("UserRepository")
      private usersRepository: IUsersRepository,
      @inject("UserTokenRepository")
      private usersTokenRepository: IUsersTokenRepository,
      @inject("DaysDateProvider")
      private dateProvider: IDateProvider
   ) {}

   async execute({ token }: IRefreshTokenDTO): Promise<ITokenResponseDTO> {
      const { email, sub } = verify(token, auth.secretRefreshToken) as IPayload;
      const userId = sub;
      
      const userToken = await this.usersTokenRepository.findByUserId({ userId, refreshToken: token }); 
      
      await this.usersTokenRepository.removeById({ id: userToken.id });

      const refreshToken = sign({ email }, auth.secretRefreshToken, {
         subject: sub,
         expiresIn: auth.expiresInRefreshToken
      });

      const expiresDate = this.dateProvider.addDays(auth.expiresInRefreshTokenDays);

      await this.usersTokenRepository.create({
         expiresDate,
         refreshToken,
         userId
      });

      const newToken = sign({ email }, auth.secret, {
         subject: userId,
         expiresIn: auth.expiresIn
      });

      const user = await this.usersRepository.findById(userId);

      return {
         refreshToken,
         token: newToken,
         user
      };
   }
}