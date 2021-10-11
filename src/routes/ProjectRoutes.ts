import {Router} from 'express';
import { ProjetoController } from '../controllers/ProjetoController';

const projectRoutes = Router();
const projetoController = new ProjetoController();

projectRoutes.get("/project/getAll",projetoController.GetAllProjects)
projectRoutes.get("/project/:userId",projetoController.GetProjectsByUserId);
projectRoutes.get("/project/:projectId/avisos",projetoController.GetAllAvisos)
projectRoutes.get("/project/:projectId/atividades",projetoController.GetAtividadeByProjectId);
projectRoutes.get("/project/:projectId/usuarios",projetoController.GetAllUserByProjectId)
projectRoutes.get("/project/:projectId/info",projetoController.GetProjectsById);

projectRoutes.post("/project/createProjects",projetoController.Create)
projectRoutes.post("/project/:projectId/CreateNotice",projetoController.CreateNotice)
projectRoutes.post("/project/:userId/:projectId/CreateTags",projetoController.CreateTags)
projectRoutes.post("/project/:projectId/criarAtividade",projetoController.CriarAtividade)
projectRoutes.post("/project/:projectId/linkUsuario",projetoController.LinkUserProject)
projectRoutes.post("/project/:projectId/deleteProject",projetoController.DeleteProject)

export { projectRoutes };