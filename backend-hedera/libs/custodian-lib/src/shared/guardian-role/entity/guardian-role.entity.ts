import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GuardianRoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;
}