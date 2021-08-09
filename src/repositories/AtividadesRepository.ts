import {Repository,EntityRepository} from 'typeorm';
import {Atividades} from '../entities/Atividades';

@EntityRepository(Atividades)
class AtividadesRepository extends Repository<Atividades> {}

export { AtividadesRepository};
