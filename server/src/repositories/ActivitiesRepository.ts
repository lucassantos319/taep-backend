import {Repository,EntityRepository} from 'typeorm';
import {Atividades} from '../entities/Activities';

@EntityRepository(Atividades)
class ActivitiesRepository extends Repository<Atividades> {}

export { ActivitiesRepository};
