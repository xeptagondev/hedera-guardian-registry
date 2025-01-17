import {
    Column,
    Entity,
    ManyToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { DocumentTypeEntity } from '../../document-type/entity/document-type.entity';

@Entity('guardian_role')
export class GuardianRoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @PrimaryColumn({ name: 'role_id' })
    roleId: number;

    @PrimaryColumn({ name: 'org_type_id' })
    orgTypeId: number;

    // @ManyToOne(() => RoleEntity, (roleEntity) => role.guardianRoles, {
    //     cascade: false,
    // })
    // @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
    // roles: RoleEntity[];

    // @ManyToOne(
    //     () => OrganizationTypeEntity,
    //     (orgTypeEntity) => orgTypeEntity.guardianRoles,
    //     { cascade: false },
    // )
    // @JoinColumn([{ name: 'org_type_id', referencedColumnName: 'id' }])
    // organizationTypes: OrganizationTypeEntity[];

    @ManyToMany(
        () => DocumentTypeEntity,
        (docTypeEntity) => docTypeEntity.guardianRoles,
        { cascade: false },
    )
    permissionedDocTypes?: DocumentTypeEntity[];
}
