import {getCustomRepository} from 'typeorm'
import {DisciplinasRepository} from '../repositories/DisciplinaRepository'
import {ProjectsDisciplinaService} from '../services/ProjectsDisciplinaService'

class DisciplinaService{

    async Create(title,projectId:number){

        try{
            const DisciplinaRepository = getCustomRepository(DisciplinasRepository);
    
            if ( title.length > 0 )
            {
                const tag = await DisciplinaRepository.create({titulo:title});
                const DisciplinaSave = await DisciplinaRepository.save(tag);
                
                const projectsDisciplinaService = new ProjectsDisciplinaService();
                const project = await projectsDisciplinaService.Create(projectId,DisciplinaSave.id);
            
                return project;
            }
        } catch (error){
            throw new Error(error);
        }

    }

    async GetAllDisciplina(){
        const Disciplina = getCustomRepository(DisciplinasRepository)
        .createQueryBuilder('Disciplina')
        .getMany();

        return Disciplina;
    }

    async GetAllDisciplinaByProjectId(projectId:number){

        const projectDisciplinaervice = new ProjectsDisciplinaService();
        const allDisciplinaProject = await projectDisciplinaervice.GetAllDisciplinaByProjectId(projectId);

        const allAvisosProjects = getCustomRepository(DisciplinasRepository)
        .createQueryBuilder('Disciplina')
        .where('Disciplina.id = id',allDisciplinaProject)
        .getMany();

        return allAvisosProjects;
    }

}

export {DisciplinaService} 