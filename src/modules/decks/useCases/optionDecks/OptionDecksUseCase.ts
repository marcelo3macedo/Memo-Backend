import { inject, injectable } from 'tsyringe';

import IFrequenciesRepository from '@modules/frequencies/repositories/IFrequenciesRepository';
import IThemeRepository from '@modules/themes/repositories/IThemeRepository';

@injectable()
export class OptionDecksUseCase {
  constructor(
    @inject('FrequenciesRepository')
    private frequenciesRepository: IFrequenciesRepository,
    @inject('ThemeRepository')
    private themeRepository: IThemeRepository
  ) {}

  async execute(): Promise<any> {
    const frequencies = await this.frequenciesRepository.list()
    const themes = await this.themeRepository.list()

    return {
      frequencies,
      themes
    }
  }
}