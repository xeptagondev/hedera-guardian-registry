import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [RoleModule, UsersModule]
})
export class SharedModule {}
