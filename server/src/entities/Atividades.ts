import {Column, CreateDateColumn, Entity,  JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Questoes} from './Questoes';
import { User } from './User';

@Entity('activities')
class Atividades{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    titulo: string;

    @Column()
    descricao: string;
    @ManyToMany(type => User)
    @JoinTable()
    userCreator: User;

    @CreateDateColumn()
    created_at: string;

};

export {Atividades};