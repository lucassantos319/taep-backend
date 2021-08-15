import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('disciplinas')
class Disciplinas{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @CreateDateColumn()
    created_at: string;

};

export {Disciplinas};