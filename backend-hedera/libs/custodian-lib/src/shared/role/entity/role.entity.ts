import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { OrganizationTypeEntity } from '../../organization-type/entity/organization-type.entity';

@Entity()
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(
        () => OrganizationTypeEntity,
        (orgTypeEntity) => orgTypeEntity.roles,
        { cascade: false },
    )
    @JoinTable({
        name: 'guardian_role',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'org_type_id',
            referencedColumnName: 'id',
        },
    })
    orgTypes: OrganizationTypeEntity[];
}
