import { Module } from "@nestjs/common";
import { OrganizationModule } from "./organization/organization.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [OrganizationModule, UserModule],
  exports: [OrganizationModule, UserModule],
})
export class SharedModule {}
