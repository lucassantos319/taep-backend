import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Atividades} from "./Activities";

@Entity('questions')
class Questions{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    idQuestion: number;

    @CreateDateColumn()
    created_at: string;

};

export {Questions};