import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { OrganizationEntity } from "./organization.entity";
import { OrganizationTypeRoleEntity } from "./organization.type.role.entity";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @ManyToOne(() => OrganizationEntity, { nullable: false })
  @JoinColumn()
  organization: OrganizationEntity;

  @ManyToOne(() => OrganizationTypeRoleEntity, { nullable: false })
  @JoinColumn()
  role: OrganizationTypeRoleEntity;
}
