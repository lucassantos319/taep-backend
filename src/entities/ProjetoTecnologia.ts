import { Entity, PrimaryColumn } from "typeorm";

@Entity("projeto_tecnologia")
class ProjetoTecnologia{

    @PrimaryColumn()
    projectId:number;

    @PrimaryColumn()
    tecnologiaId:number;
}

export {ProjetoTecnologia}