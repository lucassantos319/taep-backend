import {Repository,EntityRepository} from 'typeorm';
import {Disciplinas} from '../entities/Disciplinas';

@EntityRepository(Disciplinas)
class DisciplinasRepository extends Repository<Disciplinas> {}

export { DisciplinasRepository};
