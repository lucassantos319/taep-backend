import { getCustomRepository} from 'typeorm';
import { ProjetoAtividadesRepository } from '../repositories/ProjetoAtividadeRepository';

interface IProjectActivities{
    projectId:number,
    activitiesId:number
}

class ProjetoAtividadeService{

    async Create({projectId,activitiesId}:IProjectActivities){
        try {
            const projectActivitiesRepository = getCustomRepository(ProjetoAtividadesRepository);
            const projectActivities = await projectActivitiesRepository.create({projectsId:projectId, activitiesId:activitiesId});
           
            await projectActivitiesRepository.save(projectActivities);
            return projectActivities;

        } catch (error){
            throw new Error(error);
        }
    }

    async GetAllActivitiesByProjectId(projectId:number){

        const activities = await getCustomRepository(ProjetoAtividadesRepository)
        .createQueryBuilder('projects_atividades_activities')
        .andWhere("projectsId = :id",{id:projectId})
        .getMany();

        return activities;
    } 
   
}

export {ProjetoAtividadeService};