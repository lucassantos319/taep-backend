import { getCustomRepository} from 'typeorm';
import { ActivitiesRepository } from '../repositories/ActivitiesRepository'
import { ProjectActivitiesService } from '../services/ProjectActivitiesService';

interface IActivities{
    title: string,
    description: string,
    projectId:number,
}

class ActivitiesService{

    async Create({title,description,projectId}:IActivities){

        try {
            
            const activitiesRepository = getCustomRepository(ActivitiesRepository);
            const projectActivitiesService = new ProjectActivitiesService();
            
            const activities = await activitiesRepository.create({
                title: title,description: description
            });

            const activitiesSave = await activitiesRepository.save(activities);
            await projectActivitiesService.Create({projectId:projectId,activitiesId:activitiesSave.id});
            
            return activitiesSave;

        } catch(error) {
            throw new Error(error);
        }
    }

    // async GetAllAvisosByProjectId(projectId:number){
        
    //     const projectAvisoService = new ProjectAvisoService();
    //     const allAvisoRelation = await projectAvisoService.GetAllAvisosByProjectId(projectId);

    //     const allAvisosProjects = getCustomRepository(AvisoRepository)
    //     .createQueryBuilder('notices')
    //     .where('notices.id = id',allAvisoRelation)
    //     .getMany();

    //     return allAvisosProjects;

    // }

}

export {ActivitiesService} ;