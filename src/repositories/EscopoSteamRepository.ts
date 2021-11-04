import {Repository,EntityRepository} from 'typeorm';
import {EscopoSteam} from '../entities/EscopoSteam';

@EntityRepository(EscopoSteam)
class EscopoSteamRepository extends Repository<EscopoSteam> {}

export { EscopoSteamRepository};
