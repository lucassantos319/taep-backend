import {Entity, PrimaryColumn} from 'typeorm';

@Entity('escopo_ods')
class EscopoODS{

    @PrimaryColumn()
    EscopoId: number;

    @PrimaryColumn()
    OdsId: number;

};

export {EscopoODS};