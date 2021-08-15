import { getCustomRepository} from 'typeorm';
import { AtividadesRepository } from '../repositories/AtividadesRepository'
import { ProjetoAtividadeService } from './ProjetoAtividadeService';

interface IAtividades{
    titulo:string,
    descricao:string
    projectId:number,
}

class AtividadeService{

    async Create({titulo,descricao,projectId}:IAtividades){

        try {
            
            const atividadeRepository = getCustomRepository(AtividadesRepository);
            const projectAtividadeService = new ProjetoAtividadeService();
            
            const atividade = await atividadeRepository.create({
                titulo:titulo,descricao:descricao
            });

            const atividadeSave = await atividadeRepository.save(atividade);
            await projectAtividadeService.Create({projectId:projectId,activitiesId:atividadeSave.id});
            
            return atividadeSave;

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

export {AtividadeService} ;