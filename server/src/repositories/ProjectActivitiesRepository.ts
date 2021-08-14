import {Repository,EntityRepository} from 'typeorm';
import { ProjetoActivities } from '../entities/ProjetoActivities';

@EntityRepository(ProjetoActivities)
class ProjetoActivitiesRepository extends Repository<ProjetoActivities> {}

export { ProjetoActivitiesRepository};
