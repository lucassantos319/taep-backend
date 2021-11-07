import { getCustomRepository } from "typeorm"
import {ProjetoTecnologiaRepository} from '../repositories/ProjetoTecnologiaRepository';

class ProjetoTecnologiaService{

    async Create(tecnologias,projeto ){
       
        const repository = getCustomRepository(ProjetoTecnologiaRepository);
        
        tecnologias.forEach( async (element) => {

            await repository.save(repository.create({
                tecnologiaId:element,projectId:projeto.id
            }));
        });

    }
    
}

export {ProjetoTecnologiaService}