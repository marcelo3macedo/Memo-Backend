import MailScheduler from "../entities/MailScheduler";
import ICreateMailSchedulerDTO from "../dtos/ICreateMailSchedulerDTO";

export default interface IMailSchedulerRepository {
  create(data: ICreateMailSchedulerDTO): Promise<MailScheduler>;
}