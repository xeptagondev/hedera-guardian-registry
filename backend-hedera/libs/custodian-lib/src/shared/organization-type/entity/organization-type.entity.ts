import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from '../../role/entity/role.entity';

@Entity()
export class OrganizationTypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @ManyToMany(() => RoleEntity, (roleEntity) => roleEntity.orgTypes, {
        cascade: false,
    })
    roles?: RoleEntity[];
}
