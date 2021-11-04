import { getCustomRepository } from "typeorm";
import { DisciplinasEscopoRepository } from "../repositories/DisciplinasEscopoRepository"

class DisciplinaEscopoService{
    
    async Create(disciplinas){
       
        const repository = getCustomRepository(DisciplinasEscopoRepository);
        const disc = await repository.create({
            disciplinas:disciplinas
        })

        return disc;
    }
}

export {DisciplinaEscopoService}