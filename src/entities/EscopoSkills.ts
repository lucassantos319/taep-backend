import {Entity, PrimaryColumn} from 'typeorm';

@Entity('escopo_Skills')
class EscopoSkills{

    @PrimaryColumn()
    escopoId: number;

    @PrimaryColumn()
    SkillsId: number;

};

export {EscopoSkills};