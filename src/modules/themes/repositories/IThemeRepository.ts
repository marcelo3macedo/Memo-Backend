import Theme from '../entities/Theme';

export default interface IThemeRepository {
  list(): Promise<Theme[]>;
}