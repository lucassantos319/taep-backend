import {Repository,EntityRepository} from 'typeorm';
import {EscopoODS} from '../entities/EscopoODS';

@EntityRepository(EscopoODS)
class EscopoODSRepository extends Repository<EscopoODS> {}

export { EscopoODSRepository};
