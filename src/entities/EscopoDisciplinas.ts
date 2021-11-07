import {Entity,PrimaryColumn} from 'typeorm';

@Entity('escopo_disciplinas')
class EscopoDisciplinas{

    @PrimaryColumn()
    EscopoId: number;

    @PrimaryColumn()
    OdsId: number;

}

export { EscopoDisciplinas }