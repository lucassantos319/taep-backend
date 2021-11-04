import {Repository,EntityRepository} from 'typeorm';
import {Skills} from '../entities/Skills';

@EntityRepository(Skills)
class SkillsRepository extends Repository<Skills> {}

export { SkillsRepository};
