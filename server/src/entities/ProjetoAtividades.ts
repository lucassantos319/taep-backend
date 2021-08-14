import {Column, CreateDateColumn, Entity, PrimaryColumn} from 'typeorm';

@Entity('projects_atividades_activities')
class ProjetoAtividades{

    @PrimaryColumn()
    projectsId: number;

    @PrimaryColumn()
    activitiesId: number;

};

export {ProjetoAtividades};