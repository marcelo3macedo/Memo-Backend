import { getRepository, Repository } from 'typeorm';

import { CACHE_THEMES } from '@constants/cacheKeys';
import Theme from '@modules/themes/entities/Theme';
import IThemeRepository from '../IThemeRepository';

export class ThemeRepository implements IThemeRepository {
  private repository: Repository<Theme>;

  constructor() {
    this.repository = getRepository(Theme);
  }

  async list(): Promise<Theme[]> {
    return this.repository.createQueryBuilder('themes')
      .cache(CACHE_THEMES)
      .getMany()
  }
}