import { getCustomRepository } from "typeorm";
import { TecnologiasRepository } from "../repositories/TecnologiasRepository";


class TecnologiaService {

    async GetTecnologiaByName(element){
        
        const steamByName = await getCustomRepository(TecnologiasRepository)
        .createQueryBuilder("tecnologias")
        .andWhere("tecnologias.tecnologia = :tecnologia",{tecnologia:element})
        .getOne();

        return steamByName;
    }
}

export {TecnologiaService}