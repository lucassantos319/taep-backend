import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity("disciplinasEscopo")
class DisciplinasEscopo{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    disciplinas: string;

}

export{DisciplinasEscopo}