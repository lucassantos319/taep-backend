import { getCustomRepository} from 'typeorm';
import { ProjetoAvaliacaoRepository } from '../repositories/ProjetoAvaliacaoRepository';

interface IProjectActivities{
    projectId:number,
    avaliacaoId:number
}

class ProjetoAvaliacaoService{

    async Create({projectId,avaliacaoId}:IProjectActivities){
        try {
            const projectActivitiesRepository = getCustomRepository(ProjetoAvaliacaoRepository);
            const projectActivities = await projectActivitiesRepository.create({projectsId:projectId, avaliacaoId:avaliacaoId});
           
            await projectActivitiesRepository.save(projectActivities);
            return projectActivities;

        } catch (error){
            throw new Error(error);
        }
    }

    async GetAllActivitiesByProjectId(projectId:number){

        const activities = await getCustomRepository(ProjetoAvaliacaoRepository)
        .createQueryBuilder('projectAvaliacaos_activities')
        .andWhere("projectsId = :id",{id:projectId})
        .getMany();

        return activities;
    } 
   
}

export {ProjetoAvaliacaoService};