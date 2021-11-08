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

        console.log("escopo save")
        const escopoODSService = new EscopoODSService();
        escopoODSService.Create(ods,escopoSaveBD);

        console.log("escopo ods save")

        const escopoSteamService = new EscopoSteamService();
        escopoSteamService.Create(steam,escopoSaveBD);

        console.log("escopo steam save")

        const escopoSkillsService = new EscopoSkillsService();
        escopoSkillsService.Create(skills,escopoSaveBD);

        console.log("escopo skills save")

        return escopoSaveBD;
    }

    async Save(escopoSave){

        const repository = getCustomRepository(EscopoRepository);
        await repository.save(escopoSave);
    
    }

}

export {EscopoService}