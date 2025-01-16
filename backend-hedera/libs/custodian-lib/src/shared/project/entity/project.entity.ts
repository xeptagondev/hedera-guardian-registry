import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ActivityEntity } from "../../activity/entity/activity.entity";

@Entity()
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => ActivityEntity, (activityEntity) => activityEntity.project, { nullable: true })
    activities?: ActivityEntity[];
    
}