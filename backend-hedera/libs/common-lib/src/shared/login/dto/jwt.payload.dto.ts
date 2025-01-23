import { OrganizationTypeEnum } from '../../organization-type/enum/organization-type.enum';
import { OrganizationStateEnum } from '../../organization/enum/organization.state.enum';
import { RoleEnum } from '../../role/enum/role.enum';

export class JWTPayload {
    constructor(
        public organizationName: string,
        public userName: string,
        public userId: number,
        public userRole: string,
        public organizationId: number,
        public organizationRole: string,
        public organizationState: OrganizationStateEnum,
    ) {}
}
