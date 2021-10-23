import ICreateUsersDTO from "../dtos/ICreateUsersDTO";
import IUpdateProfileUserDTO from "../dtos/IUpdateProfileUserDTO";
import Users from "../entities/Users";

export default interface IUsersRepository {
   create(data: ICreateUsersDTO): Promise<void>;
   findByEmail(email: string): Promise<Users>;
   findById(id: string): Promise<Users>;
   update(data: IUpdateProfileUserDTO): Promise<void>;
}