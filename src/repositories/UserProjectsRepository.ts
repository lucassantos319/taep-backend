import {Repository,EntityRepository} from 'typeorm';
import {UserProjects} from '../entities/UserProjetos';

@EntityRepository(UserProjects)
class UserProjectsRepository extends Repository<UserProjects> {}

export { UserProjectsRepository };
