import {Repository,EntityRepository} from 'typeorm';
import {UserProjects} from '../entities/UserProjetos';

@EntityRepository(UserProjects)
class UserProjetosRepository extends Repository<UserProjects> {}

export { UserProjetosRepository };
