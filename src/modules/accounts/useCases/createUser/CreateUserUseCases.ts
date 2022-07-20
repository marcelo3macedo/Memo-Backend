import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import MailManager from "@lib/MailManager";
import ICreateUsersDTO from "@modules/accounts/dtos/ICreateUsersDTO";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { EMAIL_ALREADY_IN_USE } from "@constants/logger";
import QueueManager from "@lib/QueueManager";
import queue from "@config/queue";

@injectable()
export default class CreateUserUseCases {
   constructor(
      @inject("UserRepository")
      private userRepository: IUsersRepository
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
      ];

      QueueManager.publishInQueue(queue.mailValidation, JSON.stringify({ 
            type: 'new-user', 
            name,
            email, 
            params
      }));
   }
}