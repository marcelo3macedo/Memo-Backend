import Theme from "@modules/themes/entities/Theme";
import IThemeRepository from "../IThemeRepository";

class ThemesRepositoryInMemory implements IThemeRepository {
    themes: Theme[] = [];

    async list(): Promise<Theme[]> {
        return this.themes;
    }
}

export { ThemesRepositoryInMemory }