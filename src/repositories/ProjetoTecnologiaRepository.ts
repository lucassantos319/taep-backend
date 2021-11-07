import {Repository,EntityRepository} from 'typeorm';
import { ProjetoTecnologia } from '../entities/ProjetoTecnologia';


@EntityRepository(ProjetoTecnologia)
class ProjetoTecnologiaRepository extends Repository<ProjetoTecnologia> {}

export { ProjetoTecnologiaRepository};
