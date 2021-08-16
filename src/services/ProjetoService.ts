import {getCustomRepository} from 'typeorm';
import { ProjetoRepository }  from '../repositories/ProjetoRepository';
import { UserService } from './UserService';
import { UserProjectsService } from './UserProjectsService';
import { AvisoService } from './AvisoService';
import { UserProjetosRepository } from '../repositories/UserProjetoRepository';
import { ProjetoAtividadeService } from './ProjetoAtividadeService';
import { AtividadesRepository } from '../repositories/AtividadesRepository';
import { UserRepository } from '../repositories/UserRepository';
import { ProjectsTagsService } from './ProjetoTagsService';
import { TagsService } from './TagsService';
import { DisciplinaService } from './DIsciplinaService';


enum Status{
    
    Inicio = 'Inicio',
    Em_Execucao = 'Em Execucao',
    Finalizados = 'Finalizados',
    Cancelado = 'Cancelado'

}

interface IProject{
    title:string,
    turma:string,
    disciplina:string,
    tecnologias:string,
    material_apoio:string,
    disciplinas_relacionais:[],
    tags:[],
    description:string,
    objective:string,
    userId:number
}

class ProjectService{
    
    async Create({title,turma,disciplina,tecnologias,material_apoio,disciplinas_relacionais,tags,description,objective,userId}:IProject){
       
        try {
            
            const projectRepository = getCustomRepository(ProjetoRepository);
        
            if ( userId == null )
                throw new Error("Id usuario não cadastrado")
    
            const userService = new UserService();
            const user = await userService.GetInfoUserById(userId)
           
            
            if ( user != null ){
    
                const project = projectRepository.create({
                   titulo:title,
                   turma:turma,
                   disciplina:disciplina,
                   tecnologias:tecnologias,
                   materiaApoio:material_apoio,
                   descricao:description,
                   objetivo:objective,
                   userCreator:user,
                   status: Status.Inicio
                });
                
                const projectSave = await projectRepository.save(project);
               
                const userProject = new UserProjectsService();
                const existRelation = await userProject.GetRelationUserById(user.id,projectSave.id);
               
                if ( existRelation != null ){
                    throw new Error('Relação já existe');
                }
                
                await userProject.Create({usersId:user.id,usersEmail:user.email,projectsId:projectSave.id});
                
                const tagsService = new TagsService();
                const disciplinaService = new DisciplinaService();

                tags.forEach( async (item) => {
                    const tags = await tagsService.Create(item["disciplina"],projectSave.id)
                });

                disciplinas_relacionais.forEach( async (item) => {
                    const disciplinas = await disciplinaService.Create(item["competencia"],projectSave.id)
                });


                return project;
            
            }

            throw new Error("Usuario nao existe");

        } catch(error){

            throw new Error(error);
        }

    }

    async GetInfoProjects(){
        
        const projects = await getCustomRepository(ProjetoRepository)
        .createQueryBuilder("projects")
        .leftJoinAndSelect('projects.userCreator','user')
        .getMany();
        
        return projects;
    }

    async GetInfoProjectById(projectId:number){
        
        const projects = await getCustomRepository(ProjetoRepository)
        .createQueryBuilder("projects")
        .leftJoinAndSelect("projects.userCreator", "users")
        .andWhere("projects.id = :id",{id:projectId})
        .getOne();
        
        return projects;
    }

    async CreateNotice({title, description, projectId}){
        try{

            const noticeService = new AvisoService();
            const notice = await noticeService.Create({title, description, projectId});

            return notice;

        } catch(error){
            throw new Error (error);
        }
    }

    async GetInfoProjectsById(projectId:number){
        
        const project = await getCustomRepository(ProjetoRepository)
        .createQueryBuilder("projects")
        .andWhere("projects.id = :id",{id:projectId})
        .getOne();

        return project;
    }

    async GetAllProjectsByUserId(userId:number){
       
        const userProjectsService = new UserProjectsService();
        const allProjectsIds = await userProjectsService.GetAllProjectsByUserId(userId);
        console.log('entre');
        var projectsId = [];

        for ( var i = 0 ; i < allProjectsIds.length ; i++ )
            projectsId.push(allProjectsIds[i].projectsId);
        
        const projects = await getCustomRepository(ProjetoRepository)
        .createQueryBuilder('projects')
        .leftJoinAndSelect('projects.userCreator','user')
        .andWhere("projects.id IN (:id)",{id:projectsId})
        .getMany();

        console.log(projects)
        
        return projects;
    
    }

    async GetAllUserByProjectId (projectId: number){
        
        const userProjetoService = new UserProjectsService();
        const allUsersId = await userProjetoService.GetAllUsersByProjectId(projectId);

        var usersId = [];
        for ( var i = 0 ; i < allUsersId.length ; i++)
            usersId.push(allUsersId[i].usersId);

        const users = await getCustomRepository(UserRepository)
        .createQueryBuilder('users')
        .select('users.id')
        .addSelect('users.first_name')
        .addSelect('users.last_name')
        .addSelect('users.email')
        .addSelect('users.user_type')
        .andWhere("users.id IN (:id)",{id:usersId})
        .getMany();

        return users
    }

    async GetAllActivitiesByProjectId(projectId:number){
        
        const projetoAtividadeService = new ProjetoAtividadeService();
        const allActivitiesIds = await projetoAtividadeService.GetAllActivitiesByProjectId(projectId);
        
        var activitiesId = [];

        for ( var i = 0 ; i < allActivitiesIds.length ; i++ )
            activitiesId.push(allActivitiesIds[i].activitiesId);
        
        
        const activities = await getCustomRepository(AtividadesRepository)
        .createQueryBuilder('activities')
        .andWhere("activities.id IN (:id)",{id:activitiesId})
        // .andWhere("activities.avaliacao=false");
        .getMany();

        
        return activities;
    }

}

export { ProjectService }
