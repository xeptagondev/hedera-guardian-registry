import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { OrganizationTypeEntity } from "./organization.type.entity";
import { RoleEntity } from "./role.entity";

@Entity()
export class OrganizationTypeRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrganizationTypeEntity, { nullable: false })
  @JoinColumn()
  type: OrganizationTypeEntity;

  @ManyToOne(() => RoleEntity, { nullable: false })
  @JoinColumn()
  role: RoleEntity;
}
