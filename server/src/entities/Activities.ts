import {Column, CreateDateColumn, Entity,  JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Questions} from './Questions';

@Entity('activities')
class Atividades{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToMany(type => Questions)
    @JoinTable()
    questions: Questions;

    @CreateDateColumn()
    created_at: string;

};

export {Atividades};