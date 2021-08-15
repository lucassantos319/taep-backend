import {getCustomRepository} from 'typeorm';
import { UserProjetosRepository } from '../repositories/UserProjetoRepository';

interface IUserProjectModel{
    usersId:number;
    usersEmail:string;
    projectsId:number;
}

class UserProjectsService{

    async Create({usersId,usersEmail,projectsId}:IUserProjectModel){
        
        const userProjectsRepository = await getCustomRepository(UserProjetosRepository);
        const usersIdExist = await userProjectsRepository.find({usersId:usersId,projectsId:projectsId});

        if ( usersIdExist.length != 0 ){
            throw new Error('Ja existe a relação');
        }

        const userProjects = await userProjectsRepository.create({
            usersId:usersId,usersEmail:usersEmail,projectsId:projectsId
        });
        
        await userProjectsRepository.save(userProjects);

    }

    async GetRelationUserById(userId: number, projectsId: number){

        const userProjectsRepository = await getCustomRepository(UserProjetosRepository);
        const usersIdExist = await userProjectsRepository.find({usersId:userId,projectsId:projectsId});

        if ( usersIdExist.length == 0 ){
            return null;
        }

        return usersIdExist;

    }

    async GetAllProjectsByUserId(userId:number){

        const projects = await getCustomRepository(UserProjetosRepository)
        .createQueryBuilder('users_projetos_projects')
        .andWhere("users_projetos_projects.usersId = :id",{id:userId})
        .getMany();

        return projects;
    } 

    async GetAllUsersByProjectId(projectId:number){
        
        const users = await getCustomRepository(UserProjetosRepository)
        .createQueryBuilder('users_projetos_projects')
        .andWhere("users_projetos_projects.projectsId = :id", {id:projectId})
        .getMany();

        return users;
    }

}

export { UserProjectsService}