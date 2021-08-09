import {Router} from 'express';
import { ProjetoController } from '../controllers/ProjetoController';

const projectRoutes = Router();
const projetoController = new ProjetoController();

projectRoutes.get("/project/getAll",projetoController.GetAllProjects)
projectRoutes.get("/project/:userId",projetoController.GetProjectsByUserId);
projectRoutes.get("/project/:userId/:projectId/GetAllNotices",projetoController.GetAllAvisos)
projectRoutes.get('/project/:userId/:projectId/GetAllActivities',projetoController.GetAllActivities)

projectRoutes.post("/project/createProjects",projetoController.Create)
projectRoutes.post("/project/:userId/:projectId/CreateNotice",projetoController.CreateNotice)
projectRoutes.post("/project/:userId/:projectId/CreateTags",projetoController.CreateTags)
projectRoutes.post("/project/:userId/:projectId/CreateActivities",projetoController.CreateAtividade)

export { projectRoutes };