import { LoginDto } from '@app/common-lib/shared/login/dto/login.dto';
import { QueryDto } from '@app/api-lib/shared/dto/query.dto';
import { UserDto } from '@app/api-lib/shared/dto/user.dto';
import { Injectable } from '@nestjs/common';
import { OrganizationService } from '../../organization/service/organization.service';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(
        private readonly organizationService: OrganizationService,
        private readonly configService: ConfigService,
    ) {}
    query(queryDto: QueryDto, req: any): any {
        throw new Error('Method not implemented.');
    }
    register(userDto: UserDto, req: any): any {
        throw new Error('Method not implemented.');
    }
    async login(loginDto: LoginDto, req: any) {
        // const organisationDetails = await this.organizationService.findById(
        //     user.companyId,
        // );
        // const payload = new JWTPayload(
        //     organisationDetails.name,
        //     user.name,
        //     user.id,
        //     user.role,
        //     user.companyId,
        //     user.companyRole,
        //     parseInt(organisationDetails.state),
        // );
        // const refreshPayload = {
        //     userId: user.id,
        //     companyId: user.companyId,
        //     role: user.role,
        //     companyRole: user.companyRole,
        // };
        // const refreshToken = this.jwtService.sign(refreshPayload, {
        //     secret: this.configService.get<string>('jwt.refreshTokenSecret'),
        //     expiresIn: this.configService.get<string>(
        //         'jwt.refreshTokenExpiresIn',
        //     ),
        // });
        // const ability = this.caslAbilityFactory.createForUser(user);
        // return {
        //     access_token: this.jwtService.sign(instanceToPlain(payload)),
        //     refresh_token: refreshToken,
        //     role: user.role,
        //     id: user.id,
        //     name: user.name,
        //     companyId: user.companyId,
        //     companyRole: user.companyRole,
        //     companyName: organisationDetails.name,
        //     companyLogo: organisationDetails.logo,
        //     ability: JSON.stringify(ability),
        //     companyState: parseInt(organisationDetails.state),
        // };

        try {
            const response = await axios.post(
                this.configService.get('custodian.url') +
                    this.configService.get('custodian.login'),
                JSON.stringify(loginDto),
            );
            return response.data;
        } catch (error) {
            console.error('Error occurred while sending POST request:', error);
        }
    }
}
