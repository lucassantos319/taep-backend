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

@Entity("ods")
class ODS{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ods:string;   

    
}

export {ODS}