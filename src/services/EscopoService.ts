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
        
        const escopoODSService = new EscopoODSService();
        escopoODSService.Create(ods,escopoSave);

        const escopoSteamService = new EscopoSteamService();
        escopoSteamService.Create(steam,escopoSave);

        const escopoSkillsService = new EscopoSkillsService();
        escopoSkillsService.Create(skills,escopoSave);

        return escopoSave;
    }
}

export {EscopoService}