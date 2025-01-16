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

    async add(userDto: UsersDTO) {
        try {
            const sruLoginResponse = await axios.post(
                `${this.configService.get('guardian.url')}${this.configService.get(
                    'guardian.login',
                )}`,
                {
                    username: this.configService.get('sru.username'),
                    password: this.configService.get('sru.password'),
                },
            );

            const rootLoginResponse = await axios.post(
                `${this.configService.get('guardian.url')}${this.configService.get(
                    'guardian.login',
                )}`,
                {
                    username: this.configService.get('root.username'),
                    password: this.configService.get('root.password'),
                },
            );
            const registerResponse = await axios.post(
                `${this.configService.get('guardian.url')}${this.configService.get(
                    'guardian.register',
                )}`,
                {
                    username: userDto.username,
                    password: userDto.password,
                    password_confirmation: userDto.password,
                    role: 'USER',
                },
            );
            const updateResponse = await axios.put(
                `${this.configService.get('guardian.url')}${this.configService.get(
                    'guardian.profileUpdate',
                )}${userDto.username}`,
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
            );

            return registerResponse.data;
        } catch (error) {
            console.error('Error occurred while sending POST request:', error);
        }
    }
}
