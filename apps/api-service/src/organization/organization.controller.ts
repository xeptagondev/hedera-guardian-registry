import { Body, Controller, Post, UseGuards, Request, Inject } from "@nestjs/common";
import { OrganizationCreateDto } from "libs/shared/dto/organization.create.dto";
import { OrganizationService } from "libs/shared/organization/src/organization/organization.service";

@Controller("organization")
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}
  @Post("create")
  async create(@Body() organizationCreateDto: OrganizationCreateDto, @Request() req): Promise<any> {
    return this.organizationService.create(organizationCreateDto, req);
  }
}
