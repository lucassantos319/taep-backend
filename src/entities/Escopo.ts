import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToOne
} from 'typeorm';
import { Projeto } from './Projeto';
import {Steam} from './Steam'
import {ODS} from './ODS'
import {Skills} from './Skills'

@Entity("escopo")
class Escopo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    disciplina: string;

    @ManyToMany(type => Steam)
    @JoinTable()
    steam: Steam;

    @ManyToMany(type => ODS)
    @JoinColumn()
    ods: ODS;

    @ManyToMany(type => Skills)
    @JoinColumn()
    skills: Skills;
        

}

export { Escopo }