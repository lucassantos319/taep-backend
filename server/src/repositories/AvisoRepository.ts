import {Repository,EntityRepository} from 'typeorm';
import {Aviso} from '../entities/Aviso';

@EntityRepository(Aviso)
class AvisoRepository extends Repository<Aviso> {}

export { AvisoRepository};
