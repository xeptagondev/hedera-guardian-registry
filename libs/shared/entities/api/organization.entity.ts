import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { OrganizationTypeEntity } from "./organization.type.entity";

@Entity()
export class OrganizationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => OrganizationTypeEntity, { nullable: false })
  @JoinColumn()
  type: OrganizationTypeEntity;
}
