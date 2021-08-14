import {Repository,EntityRepository} from 'typeorm';
import {Projeto} from '../entities/Projeto';

@EntityRepository(Projeto)
class ProjetoRepository extends Repository<Projeto> {}

export { ProjetoRepository };
