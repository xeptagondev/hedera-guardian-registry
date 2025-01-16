import { LoginDto } from '@app/common-lib/shared/login/dto/login.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { UsersDTO } from '@app/common-lib/shared/users/dto/users.dto';
@Injectable()
export class UserService {
    constructor(private readonly configService: ConfigService) {}
    async login(loginDto: LoginDto) {
        try {
            const response = await axios.post(
                `${this.configService.get('guardian.url')}${this.configService.get(
                    'guardian.login',
                )}`,
                loginDto,
            );
            return response.data;
        } catch (error) {
            console.error('Error occurred while sending POST request:', error);
        }
    }

    async accessToken(refreshToken: string) {
        const accessTokenResponse = await axios.post(
            `${this.configService.get('guardian.url')}${this.configService.get(
                'guardian.accessToken',
            )}`,
            {
                refreshToken: refreshToken,
            },
        );
        return accessTokenResponse.data.accessToken;
    }
    async delay(ms: number) {
        return new Promise<void>((resolve) => setTimeout(resolve, ms));
    }
    async userLogin(username: string, password: string) {
        const loginResponse = await axios.post(
            `${this.configService.get('guardian.url')}${this.configService.get('guardian.login')}`,
            {
                username: username,
                password: password,
            },
        );
        if (!loginResponse.data || !loginResponse.data.refreshToken) {
            throw new Error('Failed to login with provided credentials');
        }

        return loginResponse;
    }
    async add(userDto: UsersDTO) {
        // try {
        const sruLoginResponse = await this.userLogin(
            this.configService.get('sru.username'),
            this.configService.get('sru.password'),
        );
        console.log('$$$$$$$$$1');
        const rootLoginResponse = await this.userLogin(
            this.configService.get('root.username'),
            this.configService.get('root.password'),
        );
        console.log('$$$$$$$$$2');

        const registerResponse = await axios.post(
            `${this.configService.get('guardian.url')}${this.configService.get('guardian.register')}`,
            {
                username: userDto.username,
                password: userDto.password,
                password_confirmation: userDto.password,
                role: 'USER',
            },
        );

        const userLoginResponse = await this.userLogin(
            userDto.username,
            userDto.password,
        );
        console.log('$$$$$$$$$4');

        const updateResponse = await axios.put(
            `${this.configService.get('guardian.url')}${this.configService.get('guardian.profileUpdate')}${userDto.username}`,
            {
                parent: sruLoginResponse.data.did,
                hederaAccountId: userDto.hederaAccount,
                hederaAccountKey: userDto.hederaKey,
                useFireblocksSigning: false,
                fireblocksConfig: {
                    fireBlocksVaultId: '',
                    fireBlocksAssetId: '',
                    fireBlocksApiKey: '',
                    fireBlocksPrivateiKey: '',
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${await this.accessToken(
                        userLoginResponse.data.refreshToken,
                    )}`,
                    'Content-Type': 'application/json',
                },
            },
        );
        await this.delay(10000);
        console.log('$$$$$$$$$5');

        console.log(
            `${this.configService.get('guardian.url')}${this.configService.get('guardian.policyAsign1')}${userDto.username}${this.configService.get('guardian.policyAsign2')}`,
        );

        try {
            const policyAsignResponse = await axios.post(
                `${this.configService.get('guardian.url')}${this.configService.get('guardian.policyAsign1')}${userDto.username}${this.configService.get('guardian.policyAsign2')}`,
                {
                    policyIds: [this.configService.get('policy.id')],
                    assign: true,
                },
                {
                    headers: {
                        Authorization: `Bearer ${await this.accessToken(sruLoginResponse.data.refreshToken)}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
        } catch (e) {
            console.log(e);
        }
        console.log('$$$$$$$$$6');

        const createGroupResponse = await axios.post(
            `${this.configService.get('guardian.url')}/api/v1/policies/${this.configService.get('policy.id')}/blocks/${this.configService.get('blocks.create.group')}`,
            {
                group: userDto.company.companyRole,
                label: userDto.company.name,
            },
            {
                headers: {
                    Authorization: `Bearer ${await this.accessToken(userLoginResponse.data.refreshToken)}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        console.log('$$$$$$$$$7');

        return createGroupResponse.data;
        // } catch (error) {
        //     console.error('Error occurred:', error.message || error);
        //     throw new Error('Failed to complete user addition process');
        // }
    }
}
