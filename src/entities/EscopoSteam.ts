import {Entity, PrimaryColumn} from 'typeorm';

@Entity('Escopo_Steam')
class EscopoSteam{

    @PrimaryColumn()
    escopoId: number;

    @PrimaryColumn()
    SteamId: number;

};

export {EscopoSteam};