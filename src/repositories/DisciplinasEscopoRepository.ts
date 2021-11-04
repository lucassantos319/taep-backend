import {Repository,EntityRepository} from 'typeorm';
import {DisciplinasEscopo} from '../entities/DisciplinasEscopo';

@EntityRepository(DisciplinasEscopo)
class DisciplinasEscopoRepository extends Repository<DisciplinasEscopo> {}

export { DisciplinasEscopoRepository};
