import {Router} from 'express';
import { UserController } from '../controllers/UserController';

const userRoutes = Router();

const userController = new UserController();

userRoutes.get("/users",userController.GetInfoUsers);
userRoutes.get("/users/:id",userController.GetInfoUserById);


userRoutes.post("/login",userController.LogIn);
userRoutes.post("/login/createUser",userController.Create);
userRoutes.post("/editEmail/:userId",userController.UpdateEmail);
userRoutes.post("/editPassword/:userId",userController.UpdatePassword);

export {userRoutes};