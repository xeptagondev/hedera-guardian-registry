import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrganizationTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;
}