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
    descricao:string;

    @Column()
    objetivo: string;

    @ManyToOne(type => User)
    @JoinColumn()
    userCreator: User;

    @ManyToMany(type => Tags )
    @JoinTable() 
    tags: Tags;

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