import { getCustomRepository } from "typeorm"
import { EscopoSteamRepository } from "../repositories/EscopoSteamRepository"
import { SteamService } from "./SteamService";

class EscopoSteamService {

    async Create(steam,escopo){
        
        const repository = getCustomRepository(EscopoSteamRepository);
        const steamService = new SteamService();

        await steam.forEach(async (element) => {
            var steamBd = await steamService.GetSteamByName(element);

            await repository.save(
                repository.create({
                    SteamId:steamBd.id,
                    escopoId:escopo.id
                })
            );

        });
    }

}

export {EscopoSteamService}