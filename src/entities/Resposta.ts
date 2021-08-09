import {Column, CreateDateColumn, Entity,  JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Questoes} from './Questoes';
import { User } from './User';

@Entity('answers')
class Resposta{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    resposta: string;

    @Column()
    nota: number;

    @ManyToMany(type => Questoes)
    @JoinTable()
    questions: Questoes;

    @ManyToMany(type => User)
    @JoinTable()
    userCreator: User;

    @CreateDateColumn()
    created_at: string;

};

export {Resposta};