import {Repository,EntityRepository} from 'typeorm';
import {EscopoDisciplinas} from '../entities/EscopoDisciplinas';

@EntityRepository(EscopoDisciplinas)
class EscopoDisciplinasRepository extends Repository<EscopoDisciplinas> {}

export { EscopoDisciplinasRepository};
