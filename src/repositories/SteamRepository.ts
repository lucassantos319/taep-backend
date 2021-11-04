import {Repository,EntityRepository} from 'typeorm';
import {Steam} from '../entities/Steam';

@EntityRepository(Steam)
class SteamRepository extends Repository<Steam> {}

export { SteamRepository};
