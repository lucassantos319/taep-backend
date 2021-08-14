import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('tags')
class Tags{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @CreateDateColumn()
    created_at: string;

};

export {Tags};