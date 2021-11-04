import {Repository,EntityRepository} from 'typeorm';
import {Escopo} from '../entities/Escopo';

@EntityRepository(Escopo)
class EscopoRepository extends Repository<Escopo> {}

export { EscopoRepository};
