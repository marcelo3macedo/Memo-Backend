import { getRepository, Repository } from 'typeorm';

import MailScheduler from '@modules/validation/entities/MailScheduler';
import IMailSchedulerRepository from '../IMailSchedulerRepository';

export class MailSchedulerRepository implements IMailSchedulerRepository {
  private repository: Repository<MailScheduler>;

  constructor() {
    this.repository = getRepository(MailScheduler);
  }

  async create({ type, destination, params }): Promise<MailScheduler> {  
    const mailScheduler = this.repository.create({
      type,
      destination,
      params
    });

    return await this.repository.save(mailScheduler);
  }
}