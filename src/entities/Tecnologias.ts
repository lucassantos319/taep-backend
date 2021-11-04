import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tecnologias")
class Tecnologias{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    tecnologia:string;

}

export {Tecnologias}