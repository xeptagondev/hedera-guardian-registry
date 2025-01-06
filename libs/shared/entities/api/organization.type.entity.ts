import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrganizationTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
