import {Column, Entity,PrimaryColumn} from 'typeorm';

@Entity('users_projetos_projects')
class UserProjects{

    @PrimaryColumn()
    usersId:number;

    @Column()
    usersEmail:string;

    @PrimaryColumn()
    projectsId:number;

}

export { UserProjects }