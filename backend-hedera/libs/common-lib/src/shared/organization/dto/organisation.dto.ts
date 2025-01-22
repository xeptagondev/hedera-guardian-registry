import { OrganizationTypeEnum } from '../../organization-type/enum/organization-type.enum';

export class OrganisationDto {
    id: number;
    name: string;
    companyRole: OrganizationTypeEnum;
}
