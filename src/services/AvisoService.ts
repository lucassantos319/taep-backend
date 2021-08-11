import { getCustomRepository} from 'typeorm';
import { AvisoRepository } from '../repositories/AvisoRepository'
import { ProjectAvisoService } from './ProjetoAvisoService';

interface IAviso{
    title: string,
    description: string,
    projectId:number,
}

class AvisoService{

    async Create({title,description,projectId}:IAviso){

        try {
            
            const avisoRepository = getCustomRepository(AvisoRepository);
            const projectAvisoService = new ProjectAvisoService();
            
            const aviso = await avisoRepository.create({
                titulo: title,descricao: description
            });

            const avisoSave = await avisoRepository.save(aviso);
            await projectAvisoService.Create({projectId:projectId,noticeId:avisoSave.id});
            
            return avisoSave;

        } catch(error) {
            throw new Error(error);
        }
    }

    async GetAllAvisosByProjectId(projectId){
        
        const projectAvisoService = new ProjectAvisoService();
        const allAvisoRelation = await projectAvisoService.GetAllAvisosByProjectId(projectId);

        const allAvisosProjects = getCustomRepository(AvisoRepository)
        .createQueryBuilder('notices')
        .where('notices.id = id',allAvisoRelation)
        .getMany();

        return allAvisosProjects;

    }

}

export {AvisoService} ;