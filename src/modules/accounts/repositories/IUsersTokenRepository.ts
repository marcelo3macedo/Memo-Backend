import ICreateUsersTokenDTO from "../dtos/ICreateUsersTokenDTO";
import IFindRefreshTokenDTO from "../dtos/IFindRefreshTokenDTO";
import IFindUsersTokenDTO from "../dtos/IFindUsersTokenDTO";
import IRemoveUsersTokenDTO from "../dtos/IRemoveUsersTokenDTO";
import UsersToken from "../entities/UsersToken";

export default interface IUsersTokenRepository {
   create(data: ICreateUsersTokenDTO): Promise<UsersToken>;
   findByUserId(data: IFindUsersTokenDTO): Promise<UsersToken>;
   findByRefreshToken(data: IFindRefreshTokenDTO): Promise<UsersToken>;
   removeById(data: IRemoveUsersTokenDTO): Promise<void>;
}