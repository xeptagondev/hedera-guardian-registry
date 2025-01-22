import { LoginDto } from '@app/common-lib/shared/login/dto/login.dto';
import { Injectable } from '@nestjs/common';
import { OrganizationService } from '../../organization/service/organization.service';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { UsersDTO } from '@app/common-lib/shared/users/dto/users.dto';
import { QueryDto } from '@app/common-lib/shared/query/dto/query.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly organizationService: OrganizationService,
        private readonly configService: ConfigService,
    ) {}
    query(queryDto: QueryDto, req: any): any {
        throw new Error('Method not implemented.');
    }
    async add(userDto: UsersDTO, req: any) {
        try {
            const response = await axios.post(
                this.configService.get('url') +
                    this.configService.get('user.add'),
                userDto,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async login(loginDto: LoginDto) {
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
                this.configService.get('url') +
                    this.configService.get('user.login'),
                loginDto,
            );
            return response.data;
        } catch (error) {
            console.error('Error occurred while sending POST request:', error);
        }
    }
}
