import ICreateUsersDTO from "../../dtos/ICreateUsersDTO";
import Users from "../../entities/Users";
import IUsersRepository from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: Users[] = [];

    async create({ email, name, password }: ICreateUsersDTO): Promise<void> {
        const user = new Users();

        Object.assign(user, {
          email, name, password  
        });

        this.users.push(user);
    }

    async findByEmail(email: string): Promise<Users> {
        return this.users.find(user => user.email === email)!;
    }

    async findById(id: string): Promise<Users> {
        return this.users.find(user => user.id === id)!;
    }
}

export { UsersRepositoryInMemory }