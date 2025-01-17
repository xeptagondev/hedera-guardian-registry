import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { DocumentTypeEntity } from '../../document-type/entity/document-type.entity';
import { ActivityEntity } from '../../activity/entity/activity.entity';

@Entity()
@Unique(['activity', 'documentType'])
export class ActivityDocEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => DocumentTypeEntity,
        (docTypeEntity) => docTypeEntity.activityDocs,
    )
    documentType: DocumentTypeEntity;

    @ManyToOne(
        () => ActivityEntity,
        (activityEntity) => activityEntity.activityDocs,
    )
    activity: ActivityEntity;
}
