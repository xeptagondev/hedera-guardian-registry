import { Unwrap } from '@app/common-lib/core/util/unwrappable';
import { OrganizationTypeEnum } from '../../organization-type/enum/organization-type.enum';
import { SuperDTO } from '@app/common-lib/core/dto/super.dto';
import { OrganizationEntity } from '@app/custodian-lib/shared/organization/entity/organization.entity';

export class OrganisationDto extends SuperDTO<OrganizationEntity> {
    @Unwrap()
    id: number;
    @Unwrap()
    name: string;
    @Unwrap()
    companyRole: OrganizationTypeEnum;
}
