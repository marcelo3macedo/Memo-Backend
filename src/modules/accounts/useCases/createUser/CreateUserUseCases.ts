import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import ICreateUsersDTO from "@modules/accounts/dtos/ICreateUsersDTO";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
export default class CreateUserUseCases {
   constructor(
      @inject("UserRepository")
      private userRepository: IUsersRepository
   ) {}

   async execute({ email, name, password }: ICreateUsersDTO): Promise<void> {
      const findUser = await this.userRepository.findByEmail(email);

      if (findUser) {
         throw new AppError("Email already in use", 401);
      }

      const passwordHash = await hash(password, 8);
      await this.userRepository.create({ password: passwordHash, name, email });
   }
}