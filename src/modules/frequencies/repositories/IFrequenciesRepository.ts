import Frequency from '../entities/Frequency';

export default interface IFrequenciesRepository {
  list(): Promise<Frequency[]>;
  getDefault(): Promise<Frequency>;
}