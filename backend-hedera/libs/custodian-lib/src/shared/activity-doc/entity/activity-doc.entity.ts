import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ActivityDocEntity {
    @PrimaryGeneratedColumn()
    id: number;
}