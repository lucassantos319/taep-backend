import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Steam")
class Steam {
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    steam:string;
}

export {Steam}