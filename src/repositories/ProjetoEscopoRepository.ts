import {Repository,EntityRepository} from 'typeorm';
import {ProjetoEscopo} from '../entities/ProjetoEscopo';

@EntityRepository(ProjetoEscopo)
class ProjetoEscopoRepository extends Repository<ProjetoEscopo> {}

export { ProjetoEscopoRepository};
