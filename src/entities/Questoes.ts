import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Atividades} from "./Atividades";

@Entity('questions')
class Questoes{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    tipo: number;

    @Column()
    nota: number;

    @CreateDateColumn()
    created_at: string;

};

export {Questoes};