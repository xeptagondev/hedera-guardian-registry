import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GuardianRoleEntity } from '../../guardian-role/entity/guardian-role.entity';

@Entity()
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(
        () => GuardianRoleEntity,
        (guardianRoleEntity) => guardianRoleEntity.role,
        { cascade: false },
    )
    guardianRoles: GuardianRoleEntity[];
}
