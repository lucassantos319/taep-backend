import {getCustomRepository} from 'typeorm';
import { ProjetoRepository }  from '../repositories/ProjetoRepository';
import { UserService } from './UserService';
import { UserProjectsService } from './UserProjectsService';
import { AvisoService } from './AvisoService';
import { UserProjetosRepository } from '../repositories/UserProjetoRepository';
import { ProjetoAtividadeService } from './ProjetoAtividadeService';
import { AtividadesRepository } from '../repositories/AtividadesRepository';


enum Status{
    
    Inicio = 'Inicio',
    Em_Execucao = 'Em Execucao',
    Finalizados = 'Finalizados',
    Cancelado = 'Cancelado'

}

interface IProject{
    title: string,
    description:string,
    objective:string,
    userId: number
}

class ProjectService{
    
    async Create({title,description,objective,userId}:IProject){
       
        try {
            
            const projectRepository = getCustomRepository(ProjetoRepository);
        
            if ( userId == null )
                throw new Error("Id usuario não cadastrado")
    
            const userService = new UserService();
            const user = await userService.GetInfoUserById(userId)
           
            
            if ( user != null ){
    
                const project = projectRepository.create({
                   titulo:title,descricao:description,objetivo:objective,userCreator:user,
                   status: Status.Inicio
                });
                
                const projectSave = await projectRepository.save(project);
                const userProject = new UserProjectsService();
                const existRelation = await userProject.GetRelationUserById(user.id,projectSave.id);
               
                if ( existRelation != null ){
                    throw new Error('Relação já existe');
                }
                
                await userProject.Create({usersId:user.id,usersEmail:user.email,projectsId:projectSave.id});
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
        .select('projects.id')
        .addSelect('projects.title')
        .addSelect('projects.description')
        .addSelect('projects.objective')
        .addSelect('projects.userCreatorId')
        .addSelect('projects.userCreatorEmail')
        .getMany();
        
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

    async GetInfoProjectsById(projectId){
        
        const project = await getCustomRepository(ProjetoRepository)
        .createQueryBuilder("projects")
        .andWhere("projects.id = :id",{id:projectId})
        .getOne();

        return project;
    }

    async GetAllProjectsByUserId(userId){
       
        const userProjectsService = new UserProjectsService();
        const allProjectsIds = await userProjectsService.GetAllProjectsByUserId(userId);
        
        var projectsId = [];

        for ( var i = 0 ; i < allProjectsIds.length ; i++ )
            projectsId.push(allProjectsIds[i].projectsId);
        
        const projects = await getCustomRepository(ProjetoRepository)
        .createQueryBuilder('projects')
        .leftJoinAndSelect('projects.userCreator','user')
        .andWhere("projects.id IN (:id)",{id:projectsId})
        .getMany();

        
        return projects;
    
    }

    async GetAllActivitiesByProjectId(projectId){
        
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
