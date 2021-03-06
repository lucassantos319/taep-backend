import { getCustomRepository, getRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import md5 from 'md5';


interface IUserCreate{
    first_name: string, 
    last_name:string,
    email:string,
    password:string, 
    user_type:number,
    nickname:string
}

interface IUserLogin{
    email: string,
    password: string
}

class UserService{

    async Create ({first_name, last_name,email, password, user_type,nickname}:IUserCreate){

        const userRepository = getCustomRepository(UserRepository);
        const userAlreadyExists = await userRepository.findOne({email: email});

        if ( userAlreadyExists != null ){
            throw new Error("User already exists!");
        }

        const encrypedPassword = md5(password);
        
        const user = userRepository.create({
            first_name, last_name,email, password:encrypedPassword, user_type,nickname
        });

        await userRepository.save(user);
        return user;

    }

    async GetInfoUsers(){

        const users = await getCustomRepository(UserRepository)
        .createQueryBuilder("users")
        .select('users.id')
        .addSelect('users.first_name')
        .addSelect('users.last_name')
        .addSelect('users.email')
        .addSelect('users.user_type')
        .getMany();

        return users;

    }

    async GetInfoUserById(id: number){
       
        console.log(id);
        const user = await getCustomRepository(UserRepository)
        .createQueryBuilder("users")
        .select('users.id')
        .addSelect('users.first_name')
        .addSelect('users.last_name')
        .addSelect('users.email')
        .addSelect('users.user_type')
        .andWhere("users.id = :id", { id: id })
        .getOne();
        
        return user;
    }

    async GetInfoUserByEmail(emailUser:string){
       
        const user = await getCustomRepository(UserRepository)
        .createQueryBuilder("users")
        .select('users.id')
        .addSelect('users.first_name')
        .addSelect('users.last_name')
        .addSelect('users.email')
        .addSelect('users.user_type')
        .andWhere("users.email = :email", { email: emailUser })
        .getOne();
        
        return user;
    }

    async UpdateEmailUser({email,id}){
        const user = await getCustomRepository(UserRepository)
        .createQueryBuilder()
        .update("users")
        .set({ email:email })
        .where("id = :id", { id: id })
        .execute();

        return user;
    }

    async UpdatePasswordUser({password,password_old,id}){
       
        const user = await getCustomRepository(UserRepository)
        .createQueryBuilder("users")
        .where("id = :id",{id:id})
        .getOne();

        if ( user.password != password_old){
            Error("Senha errada");
        }
        
        const userNewPassword = await getCustomRepository(UserRepository)
        .createQueryBuilder()
        .update("users")
        .set({ password: md5(password) })
        .where("id = :id", { id: id })
        .execute();

        return userNewPassword;
       
    }

    async LogIn(userLogin:IUserLogin){
        
        const user = await getCustomRepository(UserRepository)
        .createQueryBuilder("users")
        .where("email = :email", {email:userLogin.email})
        .getOne();
    
        if (user != null)
            if ( md5(userLogin.password) == user.password)
                return user;
            else
                throw new Error("Password wrong");

        return null;
    }

}

export { UserService };