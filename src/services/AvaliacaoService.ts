import { getCustomRepository} from 'typeorm';
import { AvaliacaoRepository } from '../repositories/AvaliacaoRepository'
import { ProjetoAvaliacaoService } from './ProjetoAvaliacaoService';

interface IAvaliacao{
    titulo:string,
    descricao:string
    projectId:number,
}

class AvaliacaoService{

    async Create({titulo,descricao,projectId}:IAvaliacao){

        try {
            
            const avaliacaoRepository = getCustomRepository(AvaliacaoRepository);
            const projectavaliacaoService = new ProjetoAvaliacaoService();
            
            const avaliacao = await avaliacaoRepository.create({
                titulo:titulo,descricao:descricao
            });

            const avaliacaoSave = await avaliacaoRepository.save(avaliacao);
            await projectavaliacaoService.Create({projectId:projectId,avaliacaoId:avaliacaoSave.id});
            
            return avaliacaoSave;

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

export {AvaliacaoService} ;