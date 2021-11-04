import {Entity, PrimaryColumn} from 'typeorm';

@Entity('projeto_escopo')
class ProjetoEscopo{

    @PrimaryColumn()
    projectsId: number;

    @PrimaryColumn()
    escopoId: number;

};

export {ProjetoEscopo};