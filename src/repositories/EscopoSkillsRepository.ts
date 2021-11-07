import {Repository,EntityRepository} from 'typeorm';
import {EscopoSkills} from '../entities/EscopoSkills';

@EntityRepository(EscopoSkills)
class EscopoSkillsRepository extends Repository<EscopoSkills> {}

export { EscopoSkillsRepository};
