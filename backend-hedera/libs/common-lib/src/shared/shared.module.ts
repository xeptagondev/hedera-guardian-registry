import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { LoginModule } from './login/login.module';
import { OrganizationModule } from './organization/organization.module';
import { QueryModule } from './query/query.module';
import { ResponseModule } from './response/response.module';

@Module({
  imports: [RoleModule, UsersModule, LoginModule, OrganizationModule, QueryModule, ResponseModule]
})
export class SharedModule {}
