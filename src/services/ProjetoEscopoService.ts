import { getCustomRepository } from "typeorm";
import { ProjetoEscopoRepository } from "../repositories/ProjetoEscopoRepository";

class ProjetoEscopoService {

    async Create(escopoId,projectId){
        
        const repository = getCustomRepository(ProjetoEscopoRepository)
        const projetoEscopoSave = await repository.create({escopoId:escopoId,projectsId:projectId});
        await repository.save(projetoEscopoSave);
    }


}

export {ProjetoEscopoService};