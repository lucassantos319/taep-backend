import {getCustomRepository} from 'typeorm'
import {TagsRepository} from '../repositories/TagsRepository'
import { ProjectsTagsService } from './ProjetoTagsService';

class TagsService{

    async Create(title:string,projectId){

        try{
            const tagsRepository = getCustomRepository(TagsRepository);
    
            if ( title.length > 0 )
            {
                const tag = await tagsRepository.create({titulo:title});
                const tagsSave = await tagsRepository.save(tag);
                
                const projectsTagsService = new ProjectsTagsService();
                const project = await projectsTagsService.Create(projectId,tagsSave.id);
            
                return project;
            }
        } catch (error){
            throw new Error(error);
        }

    }

    async GetAllTags(){
        const tags = getCustomRepository(TagsRepository)
        .createQueryBuilder('tags')
        .getMany();

        return tags;
    }

    async GetAllTagsByProjectId(projectId:number){

        const projectTagService = new ProjectsTagsService();
        const allTagsProject = await projectTagService.GetAllTagsByProjectId(projectId);

        const allAvisosProjects = getCustomRepository(TagsRepository)
        .createQueryBuilder('tags')
        .where('tags.id = id',allTagsProject)
        .getMany();

        return allAvisosProjects;
    }

}

export {TagsService} 