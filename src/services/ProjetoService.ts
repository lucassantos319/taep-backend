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
import { ProjetoTecnologiaService } from './ProjetoTecnologiaService';
import { ProjetoEscopoRepository } from '../repositories/ProjetoEscopoRepository';
import { EscopoRepository } from '../repositories/EscopoRepository';
import { EscopoODSRepository } from '../repositories/EscopoODSRepository';
import { EscopoSteamRepository } from '../repositories/EscopoSteamRepository';
import { EscopoSkillsRepository } from '../repositories/EscopoSkillsRepository';
import { SteamRepository } from '../repositories/SteamRepository';
import { SkillsRepository } from '../repositories/SkillsRepository';


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

                await this.CreateUserProjectRelation(user,projectSave);
                await this.CreateEscopoProjectRelation({disciplinas,ods,steam,skills},projectSave);
                await this.CreateTecInfoProjectRelation(tecnologias,projectSave);

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
        
        const projetoTecnologiaService = new ProjetoTecnologiaService();
        await projetoTecnologiaService.Create(tecnologias,project);

    }

    async CreateUserProjectRelation(user,project){

        const userProject = new UserProjectsService();
        const existRelation = await userProject.GetRelationUserById(user.id,project.id);
        
        if ( existRelation != null ){
            throw new Error('Relação já existe');
        }
        
        await userProject.Create({usersId:user.id,usersEmail:user.email,projectsId:project.id});
        console.log("ok entrei2");

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

    async GetInfoEscopoByProjectId(projectId: number){
        
        const projetoEscopo = await getCustomRepository(ProjetoEscopoRepository)
        .createQueryBuilder("projeto_escopo")
        .andWhere("projeto_escopo.projectsId = :id",{id:projectId})
        .getOne();

        const escopo = await getCustomRepository(EscopoRepository)
        .createQueryBuilder("escopo")
        .andWhere("escopo.id = :id",{id:projetoEscopo.escopoId})
        .getOne();

        const escopoODS = await getCustomRepository(EscopoODSRepository)
        .createQueryBuilder("escopo_ods")
        .andWhere("escopo_ods.EscopoId = :id",{id:projetoEscopo.escopoId})
        .getMany();

        const escopoSteam = await getCustomRepository(EscopoSteamRepository)
        .createQueryBuilder("Escopo_Steam")
        .andWhere("Escopo_Steam.escopoId = :id",{id:projetoEscopo.escopoId})
        .getMany();

        var steamArray = []
        for ( var i = 0 ; i < escopoSteam.length; i++ )
            steamArray.push(escopoSteam[i].SteamId);

        const steam = await getCustomRepository(SteamRepository)
        .createQueryBuilder("Steam")
        .andWhere("Steam.id IN (:id)",{id:steamArray})
        .getMany();

        const escopoSkill = await getCustomRepository(EscopoSkillsRepository)
        .createQueryBuilder("escopo_Skills")
        .andWhere("escopo_Skills.escopoId = :id",{id:projetoEscopo.escopoId})
        .getMany();

        var skillArray = []
        for (var i = 0 ; i < escopoSkill.length ; i++)
            skillArray.push(escopoSkill[i].SkillsId);

        const skills = await getCustomRepository(SkillsRepository)
        .createQueryBuilder("skills")
        .andWhere("skills.id IN (:id)",{id:skillArray})
        .getMany();

        return {
            "escopo":escopo,
            "escopoOds":escopoODS,
            "escopoSteam":steam,
            "escopoSkill":skills
        }

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
