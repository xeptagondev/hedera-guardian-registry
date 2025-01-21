import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationEntity } from '../../organization/entity/organization.entity';
import { GuardianRoleEntity } from '../../guardian-role/entity/guardian-role.entity';

@Entity()
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true })
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    phoneNumber?: string;

    @ManyToOne(
        () => OrganizationEntity,
        (organizationEntity) => organizationEntity.users,
        { nullable: true },
    )
    @JoinColumn([{ name: 'organization', referencedColumnName: 'id' }])
    organization?: OrganizationEntity;

    @ManyToOne(
        () => GuardianRoleEntity,
        (guardianRoleEntity) => guardianRoleEntity.users,
        { nullable: true },
    )
    @JoinColumn([{ name: 'guardianRole', referencedColumnName: 'id' }])
    guardianRole?: GuardianRoleEntity;
}
