import { Injectable } from "@nestjs/common";
import { OrganizationCreateDto } from "libs/shared/dto/organization.create.dto";

@Injectable()
export class OrganizationService {
  create(organizationCreateDto: OrganizationCreateDto, req: any): any {
    throw new Error("Method not implemented.");
  }
}
