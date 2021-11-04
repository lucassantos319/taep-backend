import { getCustomRepository } from "typeorm"
import { EscopoODSRepository } from "../repositories/EscopoODSRepository";


class EscopoODSService {

    async Create(ods,escopo){
        
        const repository = getCustomRepository(EscopoODSRepository);
        var odsSave = [];
        ods.forEach(element => {
            odsSave.push(repository.create({
                OdsId:element,
                EscopoId:escopo.id
            }));
        });

        await repository.save(odsSave);
    }

}

export {EscopoODSService}