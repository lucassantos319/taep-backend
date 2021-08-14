import {Entity,PrimaryColumn} from 'typeorm';

@Entity('projects_tags_tags')
class ProjetoTags{

    @PrimaryColumn()
    tagsId:number;

    @PrimaryColumn()
    projectsId:number;

}

export { ProjetoTags }