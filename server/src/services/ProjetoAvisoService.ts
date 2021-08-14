import {getCustomRepository} from 'typeorm'
import {ProjetoAvisoRepository} from '../repositories/ProjetoAvisoRepository'

interface IProjectAviso{
    projectId: number,
    noticeId: number
}

class ProjectAvisoService{

    async Create({projectId,noticeId}:IProjectAviso){
        
        try {
            const projectNoticeRepository = getCustomRepository(ProjetoAvisoRepository);
            const projectNotice = await projectNoticeRepository.create({projectsId:projectId, noticesId:noticeId});
           
            await projectNoticeRepository.save(projectNotice);
            return projectNotice;

        } catch (error){
            throw new Error(error);
        }

    }

    async Delete({projectId,noticeId}:IProjectAviso){

    }

    async GetAllAvisosByProjectId(projectId:number){
        
        const allAviso = await getCustomRepository(ProjetoAvisoRepository)
        .createQueryBuilder('projects_avisos_notices')
        .select('noticesId')
        .where('noticesId = :id',{id:projectId})
        .getMany()

        return allAviso;

    }

}

export { ProjectAvisoService};