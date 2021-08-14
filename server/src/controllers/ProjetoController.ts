import { Request, Response} from "express";
import { AvisoService } from "../services/AvisoService";
import { ProjectService } from '../services/ProjetoService';
import { TagsService } from "../services/TagsService";
import { UserService } from '../services/UserService';
import {AtividadeService} from '../services/AtividadeService';
import {MongoService} from '../services/MongoService';
import { User } from "../entities/User";
import { projectRoutes } from "../routes/ProjectRoutes";

class ProjetoController{
    
    async Create(request: Request, response: Response){
        
        const {title,description,objective,userId} = request.body;
        const projectService = new ProjectService();
        try {
            const projeto = await projectService.Create({title,description,objective,userId});
            console.log(projeto);
            return response.json(projeto);


        } catch ( err ){

            return response.status(400).json({
                message: err.message,
            });

        }

    }

    async GetAllProjects(request: Request, response: Response){
        
        const projectService = new ProjectService();
        try {

            const projects = await projectService.GetInfoProjects(); 
            return response.json(projects);


        } catch ( err ){

            return response.status(400).json({
                message: err.message,
            });

        }
    }

    async GetAllActivities(request: Request, response: Response){
        
        const {projectId} = request.params;        
        const projectService = new ProjectService();
        try {

            const projects = await projectService.GetAllActivitiesByProjectId(Number.parseInt(projectId)); 
            return response.json(projects);


        } catch ( err ){

            return response.status(400).json({
                message: err.message,
            });

        }
    }

    async GetProjectsByUserId(request: Request, response: Response){

        console.log('entrei')
        try {
            
            const projectService = new ProjectService();
            const { userId } = request.params;
            const projects = await projectService.GetAllProjectsByUserId(Number.parseInt(userId));
            response.json(projects);

        } 
        catch (error) {
        
            return response.status(400).json({
                message: error.message,
            });
        
        }
    }

    async CreateNotice(request: Request, response: Response){

        const projectService = new ProjectService();
        const userService = new UserService();
        try { 
            const {userId,projectId} = request.params; 
            const {title, description} = request.body;
            const user = await userService.GetInfoUserById(Number.parseInt(userId));
            const project = await projectService.GetInfoProjectsById(Number.parseInt(projectId));

            if ( user.user_type == 1){
                const userCreator = project.userCreator;
                if ( userCreator.email == user.email ){
                    const notice = await projectService.CreateNotice({title,description,projectId});
                    return response.status(200).json(notice);
                    
                }
                else    
                    throw new Error("Professor não criador");
            }

            throw new Error("Não é possivel gerar novo aviso");

        } catch ( err ){
            return response.status(400).json({
                message: err.message,
            });
        }
    }

    async GetAllAvisos(request: Request, response: Response){
        
        try{

            const avisoService = new AvisoService();
            const {userId,projectId} = request.params;
            const allProjectAvisos = await avisoService.GetAllAvisosByProjectId(Number.parseInt(projectId));

            return response.json(allProjectAvisos);

        }catch ( err ){
            return response.status(400).json({
                message: err.message
            });
        }
        

    }

    async CreateTags(request: Request, response: Response){

        try {
            
            const tagsService = new TagsService();
            const {userId,projectId} = request.params;
            const {title} = request.body;
            
            const tag = await tagsService.Create(title,Number.parseInt(projectId));
            return response.json(tag);


        } catch (error) {
            return response.status(400).json(error)
        }
        
    }

    async CriarAtividade(request: Request, response: Response){

        try{
            const mongoService = new MongoService();
            const atividadeService = new AtividadeService();

            const {projectId} = request.params;
            const {userIdCreator,dataForm} = request.body;

            // atividade Id tem que ser colocada 
            const projectIdNumber = Number.parseInt(projectId);
            const atividade = await atividadeService.Create({projectId: projectIdNumber});
     
            const mongoAtividade = await mongoService.AddAtividade(atividade.id,userIdCreator,projectIdNumber,dataForm);
            return response.status(200).json(mongoAtividade);
           
        }catch(error){
            return (response.status(400).json(error.message))
        }   
    }

    async GetAtividadeByProjectId(request: Request, response: Response){
        
        try{
            const mongoService = new MongoService();
            const {projectId} = request.params;

            // atividade Id tem que ser colocada 
            const projectIdNumber = Number.parseInt(projectId);
            const mongoAtividade = await mongoService.GetAtividadeByProjectId(projectIdNumber);
            
            return response.status(200).json(mongoAtividade);
            
        } catch(error){
            return (response.status(400).json(error.message))
        }   
    }
}

export { ProjetoController } ;