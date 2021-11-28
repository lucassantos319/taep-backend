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

import {User} from './User';
import {Tags} from './Tags';
import {Aviso} from './Aviso';
import {Atividades} from './Atividades';
import { Disciplinas } from './Disciplinas';

enum Status{
    
    Inicio = 'Inicio',
    Em_Execucao = 'Em Execucao',
    Finalizados = 'Finalizados',
    Cancelado = 'Cancelado'

}

@Entity("projects")
class Projeto{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;
    
    @Column()
    turma: string;

    @Column()
    disciplina: string;

    @Column()
    materiaApoio:string;

    @Column()
    tecnologias:string;

    @Column()
    descricao:string;

    @Column()
    objetivo: string;

    @Column()
    materialApoio: string;

    @Column()
    desafio: string;

    @ManyToOne(type => User)
    @JoinColumn()
    userCreator: User;

    @ManyToMany(type => Tags )
    @JoinTable() 
    tags: Tags;

    @ManyToMany(type => Disciplinas )
    @JoinTable() 
    disciplinasRelacionadas: Disciplinas;

    @ManyToMany(type => Aviso )
    @JoinTable() 
    avisos: Aviso;

    @ManyToMany(type => Atividades )
    @JoinTable() 
    atividades: Atividades;

    @Column('text')
    status: Status;

    @CreateDateColumn()
    created_at: string;
}

export { Projeto }