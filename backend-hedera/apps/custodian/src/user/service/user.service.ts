import { LoginDto } from '@app/common-lib/shared/login/dto/login.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { UsersDTO } from '@app/common-lib/shared/users/dto/users.dto';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { AuditDTO } from '@app/custodian-lib/shared/audit/audit.dto';
import { LogLevel } from '@app/custodian-lib/shared/audit/enum/log-level.enum';
import { AuditService } from '@app/custodian-lib/shared/audit/service/audit.service';
@Injectable()
export class UserService {
    constructor(
        private readonly configService: ConfigService,
        private readonly auditService: AuditService,
    ) {}
    async login(loginDto: LoginDto) {
        try {
            const response = await axios.post(
                `${this.configService.get('guardian.url')}${this.configService.get(
                    'guardian.login',
                )}`,
                loginDto,
            );

            if (response.status == 200) {
                const message: string = `User: ${loginDto.username} has logged into the system.`;
                const auditLog: AuditDTO = {
                    logLevel: LogLevel.INFO,
                    message: message,
                };
                try {
                    await this.auditService.save(auditLog);
                } catch (error) {
                    console.error(`Failed to add log: "${message}"`, error);
                }
            }
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

    generateMessageId(): string {
        const seconds = Math.floor(Date.now() / 1000);
        const nanoseconds = process.hrtime()[1];
        return `${seconds}.${nanoseconds}`;
    }

    generateMessageHash(data: any): string {
        const jsonString = JSON.stringify(data);
        return crypto.createHash('sha256').update(jsonString).digest('hex');
    }

    generateUUID(): string {
        return uuidv4();
    }
    createPayload(response: any): any {
        return {
            document: {
                createDate: new Date().toISOString(),
                updateDate: new Date().toISOString(),
                owner: response.owner,
                hash: response.hash,
                document: response.document,
                documentFileId: this.generateUUID(),
                documentFields: [
                    'id',
                    'credentialSubject.id',
                    'credentialSubject.0.id',
                    'credentialSubject.0.name',
                    'credentialSubject.0.hedera_account',
                    'credentialSubject.0.projectName',
                    'credentialSubject.0.creditEst',
                    'credentialSubject.0.tokenId',
                    'credentialSubject.0.amount',
                ],
                hederaStatus: 'ISSUE',
                signature: 0,
                type: 'developer',
                policyId: response.policyId,
                tag: 'save_pending_dev_org',
                option: {
                    status: 'pending',
                },
                schema: response.schema,
                messageId: this.generateMessageId(),
                topicId: this.configService.get('policy.topicId'),
                relationships: response.relationships,
                accounts: response.accounts,
                group: response.group,
                messageHash: this.generateMessageHash(response.document),
                _id: this.generateUUID(),
                __sourceTag__: 'pending_developer_orgs',
                id: this.generateUUID(),
            },
            tag: 'Button_0',
        };
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
        try {
            const sruLoginResponse = await this.userLogin(
                this.configService.get('sru.username'),
                this.configService.get('sru.password'),
            );
            const rootLoginResponse = await this.userLogin(
                this.configService.get('root.username'),
                this.configService.get('root.password'),
            );

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
            console.log(updateResponse.data);
            await this.delay(10000);

            console.log(
                `${this.configService.get('guardian.url')}${this.configService.get('guardian.policyAsign1')}${userDto.username}${this.configService.get('guardian.policyAsign2')}`,
            );

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

            const createGroupTypeResponse = await axios.post(
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

            const createGroupResponse = await axios.post(
                `${this.configService.get('guardian.url')}/api/v1/policies/${this.configService.get('policy.id')}/blocks/${this.configService.get(`blocks.create.${userDto.company.companyRole}`)}`,
                {
                    document: {
                        name: userDto.company.name,
                        hedera_account: userDto.hederaAccount,
                        email: userDto.email,
                        role: userDto.company.companyRole,
                    },
                    ref: null,
                },
                {
                    headers: {
                        Authorization: `Bearer ${await this.accessToken(userLoginResponse.data.refreshToken)}`,
                        'Content-Type': 'application/json',
                    },
                },
            );

            //approval pending
            return createGroupResponse.data;
        } catch (error) {
            console.error('Error occurred:', error.message || error);
            throw new Error('Failed to complete user addition process');
        }
    }
}
