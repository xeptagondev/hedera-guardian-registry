import {
    Column,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from '../../role/entity/role.entity';
import { OrganizationTypeEntity } from '../../organization-type/entity/organization-type.entity';
import { UsersEntity } from '../../users/entity/users.entity';

export class GuardianRoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @PrimaryColumn()
    roleId: number;

    @PrimaryColumn()
    orgTypeId: number;

    @ManyToOne(() => RoleEntity, (roleEntity) => roleEntity.guardianRoles, {
        cascade: false,
    })
    @JoinColumn([{ name: 'roleId', referencedColumnName: 'id' }])
    role: RoleEntity;

    @ManyToOne(
        () => OrganizationTypeEntity,
        (orgTypeEntity) => orgTypeEntity.guardianRoles,
        { cascade: false },
    )
    @JoinColumn([{ name: 'orgTypeId', referencedColumnName: 'id' }])
    organizationType: OrganizationTypeEntity;

    @OneToMany(() => UsersEntity, (usersEntity) => usersEntity.guardianRole, {
        nullable: false,
    })
    users: UsersEntity[];

    // @ManyToMany(
    //     () => DocumentTypeEntity,
    //     (docTypeEntity) => docTypeEntity.guardianRoles,
    //     { cascade: false },
    // )
    // permissionedDocTypes?: DocumentTypeEntity[];
}
