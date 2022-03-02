import { inject, injectable } from "tsyringe";
import { v4 as uuid } from 'uuid';
import { resolve } from "path";

import auth from "@config/auth";
import ISendForgotPasswordMailDTO from "@modules/accounts/dtos/ISendForgotPasswordMailDTO";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IUsersTokenRepository from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { USER_NOTFOUND } from "@constants/logger";

@injectable()
export default class SendForgotPasswordMailUseCases {
   constructor(
       @inject("UserRepository")
       private userRepository: IUsersRepository,
       @inject("UserTokenRepository")
       private userTokenRepository: IUsersTokenRepository,
       @inject("DaysDateProvider")
       private dateProvider: IDateProvider,
       @inject("EtherealMailProvider")
       private mailProvider: IMailProvider
   ) {}

   async execute({ email }: ISendForgotPasswordMailDTO): Promise<void> {
       const user = await this.userRepository.findByEmail(email);
       const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs");

       if (!user) {
           throw new AppError(USER_NOTFOUND)
       }

       const token = uuid();
       const expiresDate = this.dateProvider.addHours(auth.expiresInForgotPasswordRefreshTokenHours);

       await this.userTokenRepository.create({
           refreshToken: token,
           userId: user.id,
           expiresDate
       })

       const variables = {
           name: user.name,
           link: `${process.env.FORGOT_EMAIL_URL}${token}`
       }

       await this.mailProvider.sendMail(email, "Recuperação de Senha", variables, templatePath)
   }
}