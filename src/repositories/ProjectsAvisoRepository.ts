import {Repository,EntityRepository} from 'typeorm';
import {ProjetoAviso} from '../entities/ProjetoAviso';

@EntityRepository(ProjetoAviso)
class ProjetoAvisoRepository extends Repository<ProjetoAviso> {}

export { ProjetoAvisoRepository};
