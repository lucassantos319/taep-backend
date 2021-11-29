import {Repository,EntityRepository} from 'typeorm';
import { ProjetoAvaliacao } from '../entities/ProjetoAvaliacao';

@EntityRepository(ProjetoAvaliacao)
class ProjetoAvaliacaoRepository extends Repository<ProjetoAvaliacao> {}

export { ProjetoAvaliacaoRepository};
