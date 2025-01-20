import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrganizationEntity } from '../../organization/entity/organization.entity';
import { GuardianRoleEntity } from '../../guardian-role/entity/guardian-role.entity';

@Entity()
export class OrganizationTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(
        () => OrganizationEntity,
        (organizationEntity) => organizationEntity.organizationType,
        { nullable: true },
    )
    organizations: OrganizationEntity[];

    @OneToMany(
        () => GuardianRoleEntity,
        (guardianRoleEntity) => guardianRoleEntity.organizationType,
        { nullable: true },
    )
    guardianRoles: GuardianRoleEntity[];
}
