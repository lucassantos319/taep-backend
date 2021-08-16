import {getCustomRepository} from 'typeorm'
import {ProjetoDisciplinasRepository} from '../repositories/ProjectsDisciplinaRepository'

class ProjectsDisciplinaService{
    
    async Create(projectId:number,disciplinasId:number){
        
        try {
            
            const projectDisciplinaRepository = getCustomRepository(ProjetoDisciplinasRepository);
            const projectTag = await projectDisciplinaRepository.create({disciplinasId:disciplinasId,projectsId:projectId});

            const projectDisciplinaave = await projectDisciplinaRepository.save(projectTag);
            return projectDisciplinaave;

        } catch (error) {
            throw new Error(error);
        }
    }

    async GetAllDisciplinaByProjectId(projectId:number){
       
        const Disciplina = getCustomRepository(ProjetoDisciplinasRepository)
        .createQueryBuilder('projects_disciplina_disciplina')
        .select('projectsId')
        .where('projectsId = :id',{id:projectId})
        .getMany();

        return Disciplina
    }
}

export {ProjectsDisciplinaService}
