import { getCustomRepository } from "typeorm"
import {EscopoSkillsRepository} from '../repositories/EscopoSkillsRepository';
import { SkillService } from "./SkillService";

class EscopoSkillsService{

    async Create(skills,escopo){
        const repository = getCustomRepository(EscopoSkillsRepository)

        skills.forEach(async (element) => {
            const skillService = new SkillService();
            var skillBd = await skillService.GetSkillByName(element);

            repository.save(
                repository.create({
                   SkillsId:skillBd.id,
                   escopoId:escopo.id 
                })
            );
        });

    }
    
}

export {EscopoSkillsService}