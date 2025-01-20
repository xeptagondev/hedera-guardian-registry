import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from '../../users/entity/users.entity';
import { OrganizationTypeEntity } from '../../organization-type/entity/organization-type.entity';

@Entity()
export class OrganizationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    organizationTypeId: number;

    @OneToMany(() => UsersEntity, (usersEntity) => usersEntity.organization, {
        nullable: true,
    })
    users: UsersEntity[];

    @ManyToOne(
        () => OrganizationTypeEntity,
        (organizationTypeEntity) => organizationTypeEntity.organizations,
        { nullable: false },
    )
    @JoinColumn([{ name: 'organizationTypeId', referencedColumnName: 'id' }])
    organizationType: OrganizationTypeEntity;
}
