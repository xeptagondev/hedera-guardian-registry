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
    id?: number;

    @Column()
    name: string;

    @OneToMany(() => UsersEntity, (usersEntity) => usersEntity.organization, {
        nullable: true,
    })
    users?: UsersEntity[];

    @ManyToOne(
        () => OrganizationTypeEntity,
        (organizationTypeEntity) => organizationTypeEntity.organizations,
        { nullable: false },
    )
    @JoinColumn([{ name: 'organizationType', referencedColumnName: 'id' }])
    organizationType: OrganizationTypeEntity;
}
