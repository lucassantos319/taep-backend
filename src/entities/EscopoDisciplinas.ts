import {Entity,PrimaryColumn} from 'typeorm';

@Entity('escopo_disciplinas')
class EscopoDisciplinas{

    @PrimaryColumn()
    disciplinasId:number;

    @PrimaryColumn()
    escopoId:number;

}

export { EscopoDisciplinas }