import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number;
}