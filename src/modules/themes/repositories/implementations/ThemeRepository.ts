import cache from '@config/cache';
import Theme from '@modules/themes/entities/Theme';
import { getRepository, Repository } from 'typeorm';
import IThemeRepository from '../IThemeRepository';

export class ThemeRepository implements IThemeRepository {
  private repository: Repository<Theme>;

  constructor() {
    this.repository = getRepository(Theme);
  }

  async list(): Promise<Theme[]> {
    return this.repository.find({ cache: cache.milliseconds });
  }
}