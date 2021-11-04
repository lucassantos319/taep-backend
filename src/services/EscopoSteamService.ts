import { getCustomRepository } from "typeorm"
import { EscopoSteamRepository } from "../repositories/EscopoSteamRepository"

class EscopoSteamService {

    async Create(steam,escopo){
        
        const repository = getCustomRepository(EscopoSteamRepository);
        var steamEscopo = [];
        steam.forEach(element => {
            steamEscopo.push(
                repository.create({
                    SteamId:element,
                    escopoId:escopo.id
                })
            );
        });

        await repository.save(steamEscopo);

    }

}

export {EscopoSteamService}