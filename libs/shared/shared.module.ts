import { Module } from "@nestjs/common";
import { OrganizationModule } from "./api/organization/organization.module";
import { UserModule } from "./api/user/user.module";

@Module({
  imports: [OrganizationModule, UserModule],
  exports: [OrganizationModule, UserModule],
})
export class SharedModule {}
