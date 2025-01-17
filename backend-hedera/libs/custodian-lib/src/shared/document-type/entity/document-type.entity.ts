import {
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ActivityDocEntity } from '../../activity-doc/entity/activity-doc.entity';
import { GuardianRoleEntity } from '../../guardian-role/entity/guardian-role.entity';

@Entity()
export class DocumentTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(
        () => ActivityDocEntity,
        (activityDocEntity) => activityDocEntity.documentType,
        { cascade: true },
    )
    activityDocs?: ActivityDocEntity[];

    @ManyToMany(
        () => GuardianRoleEntity,
        (guardianRoleEntity) => guardianRoleEntity.permissionedDocTypes,
        { cascade: false },
    )
    @JoinTable({
        name: 'document_permission',
        joinColumn: {
            name: 'document_type_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'guardian_role_id',
            referencedColumnName: 'id',
        },
    })
    guardianRoles: GuardianRoleEntity[];
}
