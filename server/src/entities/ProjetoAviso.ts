import {Column, CreateDateColumn, Entity, PrimaryColumn} from 'typeorm';

@Entity('projects_avisos_notices')
class ProjetoAviso{

    @PrimaryColumn()
    projectsId: number;

    @Column()
    noticesId: number;

    @CreateDateColumn()
    created_at: string;

};

export {ProjetoAviso};