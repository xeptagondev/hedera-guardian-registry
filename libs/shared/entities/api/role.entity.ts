import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
