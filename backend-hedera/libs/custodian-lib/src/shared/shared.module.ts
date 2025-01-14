import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OrganizationModule } from './organization/organization.module';
import { OrganizationTypeModule } from './organization-type/organization-type.module';
import { RoleModule } from './role/role.module';
import { GuardianRoleModule } from './guardian-role/guardian-role.module';
import { ProjectModule } from './project/project.module';
import { DocumentModule } from './document/document.module';
import { DocumentTypeModule } from './document-type/document-type.module';
import { ActivityModule } from './activity/activity.module';
import { ActivityDocModule } from './activity-doc/activity-doc.module';
import { ProjectDocModule } from './project-doc/project-doc.module';

@Module({
  imports: [UsersModule, OrganizationModule, OrganizationTypeModule, RoleModule, GuardianRoleModule, ProjectModule, DocumentModule, DocumentTypeModule, ActivityModule, ActivityDocModule, ProjectDocModule]
})
export class SharedModule {}
