import { getCustomRepository } from "typeorm"
import { SteamRepository } from "../repositories/SteamRepository"

class SteamService {

    async GetSteamByName(steam){
        
        const steamByName = getCustomRepository(SteamRepository)
        .createQueryBuilder("Steam")
        .andWhere("Steam.steam = :steam",{steam:steam})
        .getOne();

        return steamByName;
    }
}

export {SteamService}