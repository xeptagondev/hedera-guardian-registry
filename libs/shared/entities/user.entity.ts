import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { OrganizationEntity } from "./organization.entity";
import { UserRoleEntity } from "./user.role.entity";

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

  @ManyToOne(() => UserRoleEntity, { nullable: false })
  @JoinColumn()
  role: UserRoleEntity;
}
