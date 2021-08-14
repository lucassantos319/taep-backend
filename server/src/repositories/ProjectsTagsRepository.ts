import {Repository,EntityRepository} from 'typeorm';
import {ProjetoTags} from '../entities/ProjetoTags';

@EntityRepository(ProjetoTags)
class ProjectsTagsRepository extends Repository<ProjetoTags> {}

export { ProjectsTagsRepository };
