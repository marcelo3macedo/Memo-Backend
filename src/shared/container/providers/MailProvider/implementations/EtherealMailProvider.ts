import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

import { IMailProvider } from "../IMailProvider";
import auth from "@config/auth";

@injectable()
class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {        
    }

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");
        const templateParse = handlebars.compile(templateFileContent);
        const templateHTML = templateParse(variables);
        
        nodemailer.createTestAccount().then(async (account) => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            })

            const message = {
                from: auth.forgotPasswordMail,
                to: to,
                subject,
                html: templateHTML
            };

            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    return process.exit(1);
                }
        
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        })
        .catch((err) => console.log(err));        
    }
}

export { EtherealMailProvider };