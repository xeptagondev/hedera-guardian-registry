import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ActivityDocEntity } from '../../activity-doc/entity/activity-doc.entity';
import { ProjectEntity } from '../../project/entity/project.entity';
import { DocumentEntity } from '../../document/entity/document.entity';

@Entity()
export class ActivityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(
        () => ActivityDocEntity,
        (activityDocEntity) => activityDocEntity.documentType,
        { cascade: true },
    )
    activityDocs: ActivityDocEntity[];

    @ManyToOne(() => ProjectEntity, (projectEntity) => projectEntity.activities)
    project: ProjectEntity;

    @OneToMany(
        () => DocumentEntity,
        (documentEntity) => documentEntity.activity,
        { cascade: true },
    )
    documents?: ActivityDocEntity[];
}
