import {Entity, PrimaryColumn} from 'typeorm';

@Entity('projects_avaliacao')
class ProjetoAvaliacao{

    @PrimaryColumn()
    projectsId: number;

    @PrimaryColumn()
    avaliacaoId: number;

};

export {ProjetoAvaliacao};