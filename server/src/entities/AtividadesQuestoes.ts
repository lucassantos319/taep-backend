import {Entity, PrimaryColumn} from 'typeorm';

@Entity('activities_questions_questions')
class AtividadesQuestoes{

    @PrimaryColumn()
    activitiesId: number;

    @PrimaryColumn()
    questionsId: number;

};

export {AtividadesQuestoes};