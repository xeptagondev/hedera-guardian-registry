import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DocumentTypeEntity } from './document-type.entity';
import { GuardianRoleEntity } from '../../guardian-role/entity/guardian-role.entity';

@Entity('document_permission')
export class DocumentPermissionEntity {
    @PrimaryColumn({ name: 'document_type_id' })
    documentTypeId: number;

    @PrimaryColumn({ name: 'guardian_role_id' })
    guardianRoleId: number;

    @ManyToOne(
        () => DocumentTypeEntity,
        (docTypeEntity) => docTypeEntity.guardianRoles,
        { cascade: false },
    )
    @JoinColumn([{ name: 'document_type_id', referencedColumnName: 'id' }])
    permissionedDocTypes: DocumentTypeEntity[];

    @ManyToOne(
        () => GuardianRoleEntity,
        (guardianRoleEntity) => guardianRoleEntity.permissionedDocTypes,
        { cascade: false },
    )
    @JoinColumn([{ name: 'guardian_role_id', referencedColumnName: 'id' }])
    guardianRoles: GuardianRoleEntity[];
}
