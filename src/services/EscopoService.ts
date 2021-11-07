import { getCustomRepository } from "typeorm"
import { EscopoRepository } from "../repositories/EscopoRepository"
import { EscopoODSService } from "./EscopoODSService"
import {EscopoSteamService} from './EscopoSteamService';
import {EscopoSkillsService} from './EscopoSkillsService';

class EscopoService {

    async Create(disciplinas,ods,steam,skills){

        const escopoRepository = getCustomRepository(EscopoRepository)
        const escopoSave = await escopoRepository.create({
            disciplina:disciplinas
        });

        const escopoSaveBD = await escopoRepository.save(escopoSave);
        
        const escopoODSService = new EscopoODSService();
        escopoODSService.Create(ods,escopoSaveBD);

        const escopoSteamService = new EscopoSteamService();
        escopoSteamService.Create(steam,escopoSaveBD);

        const escopoSkillsService = new EscopoSkillsService();
        escopoSkillsService.Create(skills,escopoSaveBD);

        return escopoSaveBD;
    }

    async Save(escopoSave){

        const repository = getCustomRepository(EscopoRepository);
        await repository.save(escopoSave);
    
    }

}

export {EscopoService}