import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ActivityEntity } from '../../activity/entity/activity.entity';
import { UsersEntity } from '../../users/entity/users.entity';
import { ProjectEntity } from '../../project/entity/project.entity';

@Entity()
export class DocumentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => ActivityEntity,
        (activityEntity) => activityEntity.documents,
    )
    activity: ActivityEntity;

    @ManyToOne(() => UsersEntity, (userEntity) => userEntity.submittedDocuments)
    submittedUser: UsersEntity;

    @ManyToOne(() => UsersEntity, (userEntity) => userEntity.approvedDocuments)
    approvedUser: UsersEntity;

    @ManyToOne(() => ProjectEntity, (projectEntity) => projectEntity.documents)
    project?: ProjectEntity;
}
