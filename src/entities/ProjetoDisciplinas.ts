import {Entity,PrimaryColumn} from 'typeorm';

@Entity('projects_disciplina_disciplinas')
class ProjetoTags{

    @PrimaryColumn()
    disciplinasId:number;

    @PrimaryColumn()
    projectsId:number;

}

export { ProjetoTags }