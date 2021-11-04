import {Repository,EntityRepository} from 'typeorm';
import {ODS} from '../entities/ODS';

@EntityRepository(ODS)
class ODSRepository extends Repository<ODS> {}

export { ODSRepository};
