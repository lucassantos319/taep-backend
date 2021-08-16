import {Repository,EntityRepository} from 'typeorm';
import {ProjetoDisciplinas} from '../entities/ProjetoDisciplinas';

@EntityRepository(ProjetoDisciplinas)
class ProjetoDisciplinasRepository extends Repository<ProjetoDisciplinas> {}

export { ProjetoDisciplinasRepository };
