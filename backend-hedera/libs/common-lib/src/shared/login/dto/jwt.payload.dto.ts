import { OrganizationTypeEnum } from '../../organization-type/enum/organization-type.enum';
import { RoleEnum } from '../../role/enum/role.enum';

export class JWTPayload {
    constructor(
        public cn: string,
        public n: string,
        public sub: number,
        public r: string,
        public cid: number,
        public cr: string,
        public s: number,
    ) {}
}
