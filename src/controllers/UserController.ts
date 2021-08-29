import { Request, Response} from "express";
import { UserService } from "../services/UserService";
import md5 from 'md5';
import { SimpleConsoleLogger } from "typeorm";

class UserController{

    async Create (request: Request, response: Response){
       
        const {first_name, last_name,email, password, user_type, nickname} = request.body;
        const userService = new UserService();
       
        try {
         
            const user = await userService.Create({first_name, last_name,email, password, user_type,nickname}); 
            return response.status(200).json({
                login:true,
                id:user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                nickname: user.nickname,
                user_type: user.user_type,
                email:user.email
            });


        } catch ( err ){
            console.log(err);
            return response.status(400).json({
                message: err.message,
            });

        }

    }

    async GetInfoUsers(request: Request, response: Response){
          
        const userService = new UserService();
        try {

            const users = await userService.GetInfoUsers(); 
            return response.json(users);


        } catch ( err ){

            return response.status(400).json({
                message: err.message,
            });

        }
    }

    async GetInfoUserById(request: Request, response: Response){
        
        console.log("entrei");
        const {id} = request.params;
        const userService = new UserService();
        
        try{          
            const user = await userService.GetInfoUserById(Number.parseInt(id));
            return response.status(200).json(user);
        }
        catch ( err ){

            return response.status(400).json({
                message: err.message,
            });

        }
    }

    async LogIn (request: Request, response: Response){

        const {email, password} = request.body;
        try {

            const userService = new UserService();
            const userLogin = await userService.LogIn({email,password});

            if ( userLogin != null )
                return response.status(200).json({
                    login:true,
                    id:userLogin.id,
                    first_name: userLogin.first_name,
                    last_name: userLogin.last_name,
                    nickname: userLogin.nickname,
                    user_type: userLogin.user_type,
                    email:userLogin.email
                });
      
            return response.status(400).json({message:"usuario não existe"});

        } catch (error) {
            return response.status(400).json({
                message: error.message
            })
        }

    }

    async UpdateEmail(request:Request,response:Response){
       
        try {
            
            const {email} = request.body;
            const {userId} = request.params;
            const userService = new UserService();
            const userUpdate = await userService.UpdateEmailUser({email:email,id:userId});
           
            return response.status(200).json(userUpdate);

        } catch (error) {
            return response.status(400).json({
                message: error.message
            })
        }

    }

    async UpdatePassword(request:Request,response:Response){
       
        try {
            
            const {password,password_old} = request.body;
            const {userId} = request.params;
            const userService = new UserService();
            const userUpdate = await userService.UpdatePasswordUser({password:password,password_old: password_old,id:userId});
           
            return response.status(200).json(userUpdate);

        } catch (error) {
            return response.status(400).json({
                message: error.message
            })
        }

    }

}

export { UserController }; 