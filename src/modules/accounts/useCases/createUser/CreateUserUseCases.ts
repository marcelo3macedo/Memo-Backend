import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import cache from "@config/cache";
import MailManager from "@lib/MailManager";
import CacheManager from "@lib/CacheManager";
import ICreateUsersDTO from "@modules/accounts/dtos/ICreateUsersDTO";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IMailSchedulerRepository from "@modules/validation/repositories/IMailSchedulerRepository";
import { AppError } from "@shared/errors/AppError";

import { EMAIL_ALREADY_IN_USE } from "@constants/logger";

@injectable()
export default class CreateUserUseCases {
   constructor(
      @inject("UserRepository")
      private userRepository: IUsersRepository,
      @inject("MailSchedulerRepository")
      private mailSchedulerRepository: IMailSchedulerRepository
   ) {}

   async execute({ email, name, password }: ICreateUsersDTO): Promise<void> {
      const findUser = await this.userRepository.findByEmail(email);

      if (findUser) {
         throw new AppError(EMAIL_ALREADY_IN_USE, 401);
      }

      const passwordHash = await hash(password, 8);
      const authToken = await hash(email, 8);
      await this.userRepository.create({ password: passwordHash, name, email, authToken });

      const activationLink = MailManager.getActivationLink(authToken);

      const params = [
         { "key": "{{activationLink}}", "value": activationLink},
         { "key": "{{userName}}", "value": name }
      ]

      await this.mailSchedulerRepository.create({ type: 'new-user', destination: email, params: JSON.stringify(params) });

      CacheManager.remove('scheduled', cache.mailKey)
   }
}