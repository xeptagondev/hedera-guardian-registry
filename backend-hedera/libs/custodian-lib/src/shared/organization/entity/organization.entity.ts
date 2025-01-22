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
import { OrganizationStateEnum } from '@app/common-lib/shared/organization/enum/organization.state.enum';

@Entity()
export class OrganizationEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    group?: string;

    @Column({ nullable: true })
    payload?: string;

    @OneToMany(() => UsersEntity, (usersEntity) => usersEntity.organization, {
        nullable: true,
    })
    users?: UsersEntity[];

    @ManyToOne(
        () => OrganizationTypeEntity,
        (organizationTypeEntity) => organizationTypeEntity.organizations,
        { nullable: true },
    )
    @JoinColumn([{ name: 'organization_type_id', referencedColumnName: 'id' }])
    organizationType: OrganizationTypeEntity;

    @Column({
        type: 'enum',
        enum: OrganizationStateEnum,
        nullable: false,
        default: OrganizationStateEnum.PENDING,
    })
    state: OrganizationStateEnum;
}
