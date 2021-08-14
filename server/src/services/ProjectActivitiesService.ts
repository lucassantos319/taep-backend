import { getCustomRepository} from 'typeorm';
import { ProjetoActivitiesRepository } from '../repositories/ProjectActivitiesRepository';

interface IProjectActivities{
    projectId:number,
    activitiesId:number
}

class ProjectActivitiesService{

    async Create({projectId,activitiesId}:IProjectActivities){
        try {
            const projectActivitiesRepository = getCustomRepository(ProjetoActivitiesRepository);
            const projectActivities = await projectActivitiesRepository.create({projectsId:projectId, activitiesId:activitiesId});
           
            await projectActivitiesRepository.save(projectActivities);
            return projectActivities;

        } catch (error){
            throw new Error(error);
        }
    }

    async GetAllActivitiesByProjectId(projectId:number){

        const activities = await getCustomRepository(ProjetoActivitiesRepository)
        .createQueryBuilder('projects_atividades_activities')
        .andWhere("projectsId = :id",{id:projectId})
        .getMany();

        return activities;
    } 
   
}

export {ProjectActivitiesService};