import { User } from './User';
import {Column, CreateDateColumn, Entity,  JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity('avaliacoes')
class Avaliacao{

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

export {Avaliacao};