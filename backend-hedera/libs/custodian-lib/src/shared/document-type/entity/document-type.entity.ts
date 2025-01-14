import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DocumentTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;
}