import {Repository,EntityRepository} from 'typeorm';
import {Tecnologias} from '../entities/Tecnologias';

@EntityRepository(Tecnologias)
class TecnologiasRepository extends Repository<Tecnologias> {}

export { TecnologiasRepository};
