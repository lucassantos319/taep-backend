import { getCustomRepository } from "typeorm"
import { SkillsRepository } from "../repositories/SkillsRepository"


class SkillService{

    async GetSkillByName(element){
         
        const steamByName = await getCustomRepository(SkillsRepository)
        .createQueryBuilder("skills")
        .andWhere("skills.skill = :Skill",{Skill:element})
        .getOne();

        return steamByName;
        
    }

}

export {SkillService}