import ICreateUsersDTO from "../dtos/ICreateUsersDTO";
import IFindUserByTokenDTO from "../dtos/IFindUserByTokenDTO";
import IUpdateProfileUserDTO from "../dtos/IUpdateProfileUserDTO";
import IUpdateUserActiveDTO from "../dtos/IUpdateUserActiveDTO";
import Users from "../entities/Users";

export default interface IUsersRepository {
   create(data: ICreateUsersDTO): Promise<void>;
   findByEmail(email: string): Promise<Users>;
   findById(id: string): Promise<Users>;
   update(data: IUpdateProfileUserDTO): Promise<void>;
   findByToken(data: IFindUserByTokenDTO): Promise<Users>;
   active(data: IUpdateUserActiveDTO): Promise<void>;
}