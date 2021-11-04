import {getCustomRepository} from 'typeorm';
import { EscopoDisciplinasRepository } from '../repositories/EscopoDisciplinasRepository';
import { DisciplinaEscopoService } from './DisciplinaEscopoService';


class EscopoDisciplinasService{

    async Create(disciplinas,escopo){
        
        const disciplinaService = new DisciplinaEscopoService();
        const discSave = await disciplinaService.Create(disciplinas);
        
        const repository = getCustomRepository(EscopoDisciplinasRepository);
        repository.create({
            disciplinasId:disciplinas.id,
            escopoId:escopo.id
        })
    }
}

export {EscopoDisciplinasService};