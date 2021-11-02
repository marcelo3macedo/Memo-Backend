import ICreateUsersTokenDTO from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import IFindUsersTokenDTO from "@modules/accounts/dtos/IFindUsersTokenDTO";
import IRemoveUsersTokenDTO from "@modules/accounts/dtos/IRemoveUsersTokenDTO";
import UsersToken from "@modules/accounts/entities/UsersToken";
import IUsersTokenRepository from "../IUsersTokenRepository";

class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
    usersToken: UsersToken[] = [];

    async create({ userId, expiresDate, refreshToken }: ICreateUsersTokenDTO): Promise<UsersToken> {
        const userToken = new UsersToken();

        Object.assign(userToken, {
          userId, expiresDate, refreshToken
        });

        this.usersToken.push(userToken);

        return userToken;
    }

    async findByUserId({ userId, refreshToken }:IFindUsersTokenDTO): Promise<UsersToken> {
        return this.usersToken.find(x=> x.userId == userId && x.refreshToken == refreshToken);
    }

    async findByRefreshToken({ refreshToken }:IFindUsersTokenDTO): Promise<UsersToken> {
        return this.usersToken.find(x=> x.refreshToken == refreshToken);
    }

    async removeById({ id }:IRemoveUsersTokenDTO): Promise<void> {
        this.usersToken.shift();
    }
}

export { UsersTokenRepositoryInMemory }