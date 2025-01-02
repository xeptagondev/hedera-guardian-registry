import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class UserRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
