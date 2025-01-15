import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { DocumentTypeEntity } from "../../document-type/entity/document-type.entity";

@Entity()
export class GuardianRoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(
        () => DocumentTypeEntity,
        (docTypeEntity) => docTypeEntity.guardianRoles,
        { cascade: false },
    )
    permissionedDocTypes?: DocumentTypeEntity[];
}
