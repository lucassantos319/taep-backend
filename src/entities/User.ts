import {Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn,JoinTable, ManyToMany, OneToOne} from 'typeorm';
import { Projeto } from './Projeto';

@Entity("users")
class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    nickname: string;

    @PrimaryColumn()
    email: string;

    @Column()
    password: string;

    @Column()
    user_type:number;

    @ManyToMany(type => Projeto)
    @JoinTable() 
    projetos: Projeto;

    @CreateDateColumn()
    created_at: string;


}

export { User }