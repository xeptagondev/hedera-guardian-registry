import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ActivityEntity {
    @PrimaryGeneratedColumn()
    id: number;
}