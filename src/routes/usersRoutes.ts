import {Router} from 'express';
import { UserController } from '../controllers/UserController';

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/login/createUser",userController.Create);
userRoutes.post("/alunos/createUser",userController.Create);
userRoutes.get("/users",userController.GetInfoUsers);
userRoutes.get("/users/:id",userController.GetInfoUserById);

userRoutes.post("/login",userController.LogIn);


export {userRoutes};