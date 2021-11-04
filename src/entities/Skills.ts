import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("skills")
class Skills{
    
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    skill:string;
}

export {Skills}