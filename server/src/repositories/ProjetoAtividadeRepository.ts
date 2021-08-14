import {Repository,EntityRepository} from 'typeorm';
import { ProjetoAtividades } from '../entities/ProjetoAtividades';

@EntityRepository(ProjetoAtividades)
class ProjetoAtividadesRepository extends Repository<ProjetoAtividades> {}

export { ProjetoAtividadesRepository};
