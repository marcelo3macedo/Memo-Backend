import { AppError } from "@shared/errors/AppError";
import ICreateUsersTokenDTO from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import IFindRefreshTokenDTO from "@modules/accounts/dtos/IFindRefreshTokenDTO";
import IFindUsersTokenDTO from "@modules/accounts/dtos/IFindUsersTokenDTO";
import IRemoveUsersTokenDTO from "@modules/accounts/dtos/IRemoveUsersTokenDTO";
import UsersToken from "@modules/accounts/entities/UsersToken";
import { getRepository, Repository } from "typeorm";

import IUsersTokenRepository from "../IUsersTokenRepository";

class UserTokenRepository implements IUsersTokenRepository {
   private repository: Repository<UsersToken>;

   constructor() {
      this.repository = getRepository(UsersToken);
   }

   async create({ userId, expiresDate, refreshToken }: ICreateUsersTokenDTO): Promise<UsersToken> {
      const userToken = this.repository.create({
         userId,
         expiresDate,
         refreshToken
      });

      await this.repository.save(userToken);

      return userToken;
   }

   async findByUserId({ userId, refreshToken }:IFindUsersTokenDTO): Promise<UsersToken> {
      const userToken = await this.repository.findOne({
         userId,
         refreshToken,
      });

      if (!userToken) {
         throw new AppError("Refresh token not found");
      }

      return userToken;
   }

   async findByRefreshToken({ refreshToken }:IFindRefreshTokenDTO): Promise<UsersToken> {
      const userToken = await this.repository.findOne({
         refreshToken,
      });

      if (!userToken) {
         throw new AppError("UserToken not found");
      }

      return userToken;
   }

   async removeById({ id }:IRemoveUsersTokenDTO): Promise<void> {
      await this.repository.delete(id);
   }
}

export default UserTokenRepository;