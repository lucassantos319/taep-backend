import {Avaliacao} from '../entities/Avaliacao';
import {Repository,EntityRepository} from 'typeorm';

@EntityRepository(Avaliacao)
class AvaliacaoRepository extends Repository<Avaliacao> {}

export { AvaliacaoRepository};
