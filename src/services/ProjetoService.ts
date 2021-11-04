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
import { Projeto } from '../entities/Projeto';
import { EscopoService } from './EscopoService';
import { ProjetoEscopoService } from './ProjetoEscopoService';


enum Status{
    
    Inicio = 'Inicio',
    Em_Execucao = 'Em Execucao',
    Finalizados = 'Finalizados',
    Cancelado = 'Cancelado'

}

class ProjectService{
    
    async Create({disciplinas,ods,steam,skills,tecnologias,title,turma,description,objective,userId}){
        
        try{

            const projectRepository = getCustomRepository(ProjetoRepository);
            if (userId == null)
                throw new Error("Id usuario não cadastrado");
        
            const userService = new UserService();
            const user = await userService.GetInfoUserById(userId);
            if ( user != null ){
               
                const project = projectRepository.create({
                    titulo:title,
                    objetivo:objective,
                    turma:turma,
                    descricao:description,
                    userCreator:user,
                    status: Status.Inicio,
                });

                const projectSave = await projectRepository.save(project);
               
                this.CreateUserProjectRelation(user,projectSave);
                this.CreateEscopoProjectRelation({disciplinas,ods,steam,skills},projectSave);
                this.CreateTecInfoProjectRelation(tecnologias,projectSave);

                return project;
            
            }

        }
        catch (error){
            throw new Error(error);
        }

    }

    async CreateEscopoProjectRelation({disciplinas,ods,steam,skills},project){

        const escopoService = new EscopoService();
        const escopoProjectService = new ProjetoEscopoService();
        const escopo = await escopoService.Create(disciplinas,ods,steam,skills)

        await escopoProjectService.Create(escopo.id,project.id);

    }

    async CreateTecInfoProjectRelation(tecnologias,project){

    }

    async CreateUserProjectRelation(user,project){

        const userProject = new UserProjectsService();
        const existRelation = await userProject.GetRelationUserById(user.id,project.id);
        
        if ( existRelation != null ){
            throw new Error('Relação já existe');
        }
        
        await userProject.Create({usersId:user.id,usersEmail:user.email,projectsId:project.id});
        
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
        .leftJoinAndSelect('projects.userCreator','user')
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

    async DeleteProjectById(idProject: number) {
        
        const projeto = await getCustomRepository(ProjetoRepository)
        .createQueryBuilder('projects')
        .delete()
        .from(Projeto)
        .where("projects.id = :id", {id: idProject})
        .execute();

        return projeto;
    }
}

export { ProjectService }
