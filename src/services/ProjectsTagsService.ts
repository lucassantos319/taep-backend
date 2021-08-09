import {getCustomRepository} from 'typeorm'
import {ProjectsTagsRepository} from '../repositories/ProjectsTagsRepository'

class ProjectsTagsService{
    
    async Create(projectId:number,tagId:number){
        
        try {
            
            const projectTagsRepository = getCustomRepository(ProjectsTagsRepository);
            const projectTag = await projectTagsRepository.create({projectsId:projectId,tagsId:tagId});

            const projectTagSave = await projectTagsRepository.save(projectTag);
            return projectTagSave;

        } catch (error) {
            throw new Error(error);
        }
    }

    async GetAllTagsByProjectId(projectId:number){
       
        const tags = getCustomRepository(ProjectsTagsRepository)
        .createQueryBuilder('projects_tags_tags')
        .select('projectsId')
        .where('projectsId = :id',{id:projectId})
        .getMany();

        return tags
    }
}

export {ProjectsTagsService}
