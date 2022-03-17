import MailScheduler from '@modules/validation/entities/MailScheduler';
import IMailSchedulerRepository from '../IMailSchedulerRepository';

export default class MailSchedulerRepositoryInMemory implements IMailSchedulerRepository {
  listMailScheduler: MailScheduler[] = [];

  async create({ type, params, destination }): Promise<MailScheduler> {
    const mailScheduler = new MailScheduler();
    Object.assign(mailScheduler, {
      type, params, destination,
    });

    this.listMailScheduler.push(mailScheduler);
    return mailScheduler;
  }
}