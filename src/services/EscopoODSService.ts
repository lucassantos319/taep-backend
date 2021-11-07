import { getCustomRepository } from "typeorm"
import { EscopoODSRepository } from "../repositories/EscopoODSRepository";


class EscopoODSService {

    async Create(ods,escopo){
        
        const repository = getCustomRepository(EscopoODSRepository);
        var odsSave = [];
        ods.forEach(async (element) => {
            await repository.save(repository.create({
                OdsId:element,
                EscopoId:escopo.id
            }));
        });

    }

}

export {EscopoODSService}