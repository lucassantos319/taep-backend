import {Entity,PrimaryColumn} from 'typeorm';

@Entity('projects_disciplina_disciplinas')
class ProjetoDisciplinas{

    @PrimaryColumn()
    disciplinasId:number;

    @PrimaryColumn()
    projectsId:number;

}

export { ProjetoDisciplinas }