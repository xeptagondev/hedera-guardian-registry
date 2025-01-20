import { LoginDto } from '@app/common-lib/shared/login/dto/login.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { UsersDTO } from '@app/common-lib/shared/users/dto/users.dto';
import * as crypto from 'crypto';
import { AuditDTO } from '@app/custodian-lib/shared/audit/dto/audit.dto';
import { LogLevel } from '@app/custodian-lib/shared/audit/enum/log-level.enum';
import { AuditService } from '@app/custodian-lib/shared/audit/service/audit.service';
import { SuperService } from '@app/custodian-lib/shared/util/service/super.service';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '@app/custodian-lib/shared/users/entity/users.entity';
import { Repository } from 'typeorm';
import { GuardianRoleEntity } from '@app/custodian-lib/shared/guardian-role/entity/guardian-role.entity';
import { RoleEntity } from '@app/custodian-lib/shared/role/entity/role.entity';
import { OrganizationEntity } from '@app/custodian-lib/shared/organization/entity/organization.entity';
import { OrganizationTypeEntity } from '@app/custodian-lib/shared/organization-type/entity/organization-type.entity';
import { UtilService } from '@app/custodian-lib/shared/util/service/util.service';

@Injectable()
export class UserService extends SuperService {
    constructor(
        protected readonly auditService: AuditService,
        protected readonly utilService: UtilService,
        protected readonly configService: ConfigService,
        @InjectRepository(UsersEntity)
        private readonly userRepository: Repository<UsersEntity>,
        @InjectRepository(GuardianRoleEntity)
        private readonly guardianRoleRepository: Repository<GuardianRoleEntity>,
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
        @InjectRepository(OrganizationEntity)
        private readonly organizationRepository: Repository<OrganizationEntity>,
        @InjectRepository(OrganizationTypeEntity)
        private readonly organizationTypeRepository: Repository<OrganizationTypeEntity>,
    ) {
        super(auditService);
    }

    async save(userDTO: UsersDTO): Promise<boolean> {
        if (!userDTO.company) {
            console.log(`Company not provided for ${userDTO.email}`);
            return false;
        }

        // get organization entity
        const org: OrganizationEntity =
            await this.organizationRepository.findOneBy({
                name: userDTO.company.name,
            });

        const guardRole: GuardianRoleEntity =
            await this.getGuardianRole(userDTO);

        const userEntity: UsersEntity = {
            email: userDTO.email,
            name: userDTO.name,
            password: userDTO.password,
            phoneNumber: userDTO.phoneNumber,
            organization: org,
            guardianRole: guardRole,
        };

        await this.userRepository.save(userEntity);

        return true;
    }

    private async getGuardianRole(userDTO: UsersDTO) {
        const orgType: OrganizationTypeEntity =
            await this.organizationTypeRepository.findOneBy({
                name: userDTO.companyRole.toString(),
            });

        const role: RoleEntity = await this.roleRepository.findOneBy({
            name: userDTO.role.toString(),
        });

        // get guardian role
        const guardRole: GuardianRoleEntity =
            await this.guardianRoleRepository.findOneBy({
                organizationType: orgType,
                role: role,
            });
        return guardRole;
    }

    async login(loginDto: LoginDto) {
        try {
            const response = await axios.post(
                `${this.configService.get('guardian.url')}${this.configService.get(
                    'guardian.login',
                )}`,
                loginDto,
            );

            if (response?.status === 200) {
                const message: string = `User: ${loginDto.username} has logged into the system.`;
                const auditLog: AuditDTO = {
                    logLevel: LogLevel.INFO,
                    data: { message: message },
                    createdTime: Date.now(),
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

    generateUUID24(): string {
        return uuidv4().replace(/-/g, '').substring(0, 24);
    }

    async createPayload(response: any, role: string) {
        return {
            document: {
                createDate: new Date().toISOString(),
                updateDate: new Date().toISOString(),
                owner: response.owner,
                hash: response.hash,
                document: response.document,
                documentFileId: await this.generateUUID24(),
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
                type: this.configService.get(`metadata.approve.type.${role}`),
                policyId: response.policyId,
                tag: this.configService.get(`metadata.approve.tag.${role}`),
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
                _id: await this.generateUUID24(),
                __sourceTag__: this.configService.get(
                    `metadata.approve.sourceTag.${role}`,
                ),
                id: await this.generateUUID24(),
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

    async register(userDto: UsersDTO) {
        const policyBlocks = await this.utilService.getBlocksByPolicy(
            this.configService.get('policy.id'),
        );
        try {
            // 1: Login SRU and Gov. Root
            const sruLoginResponse = await this.login({
                username: this.configService.get('sru.username'),
                password: this.configService.get('sru.password'),
            });
            const rootLoginResponse = await this.login({
                username: this.configService.get('root.username'),
                password: this.configService.get('root.password'),
            });

            // 2: Register the new user as a 'USER' in guardian backend
            await axios.post(
                `${this.configService.get('guardian.url')}${this.configService.get('guardian.register')}`,
                {
                    username: userDto.username,
                    password: userDto.password, // This needs to be a password with SALT from API side
                    password_confirmation: userDto.password,
                    role: 'USER',
                },
            );

            // 3. User login to the guardian backend
            const userLoginResponse = await this.login({
                username: userDto.username,
                password: userDto.password,
            });

            try {
                // 4. Update the user profile with the parent (SRU)
                const updateResponse = await axios.put(
                    `${this.configService.get('guardian.url')}${this.configService.get('guardian.profileUpdate')}/${userDto.username}`,
                    {
                        parent: this.configService.get('sru.did'),
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
            } catch (e) {
                console.log(e.data);
            }
            await this.delay(10000);

            // 5. Assign the policy for the user
            const policyAssignResponse = await axios.post(
                `${this.configService.get('guardian.url')}${this.configService.get('guardian.policyAsign1')}/${userDto.username}${this.configService.get('guardian.policyAsign2')}`,
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
            console.log('$$$');

            if (userDto.company) {
                // 6. Register new organization
                return await this.registerGroup(userDto, userLoginResponse);
            } else {
                // 6. Accept an invitation (generate an invitation and create the user)
                return await this.inviteNewUser(userDto, userLoginResponse);
            }
        } catch (error) {
            console.error('Error occurred:', error.message || error);
            throw new Error('Failed to complete user addition process');
        }
    }

    private async inviteNewUser(userDto: UsersDTO, userLoginResponse) {
        // 1. Generate an invite for the given role
        const guardianRole = await this.getGuardianRole(userDto);
        const inviteResponse = await axios.post(
            `${this.configService.get('guardian.url')}/api/v1/policies/${this.configService.get('policy.id')}/blocks/${this.configService.get(`blocks.invite.${userDto.companyRole}`)}`,
            {
                action: 'invite',
                group: userDto.group,
                role: guardianRole.name,
            },
            {
                headers: {
                    Authorization: `Bearer ${await this.accessToken(userDto.refreshToken)}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        // 2. Submit the generated invitation for user creation
        const createGroupTypeResponse = await axios.post(
            `${this.configService.get('guardian.url')}/api/v1/policies/${this.configService.get('policy.id')}/blocks/${this.configService.get('blocks.create.user.group')}`,
            {
                invitation: inviteResponse.data.invitation,
            },
            {
                headers: {
                    Authorization: `Bearer ${await this.accessToken(userLoginResponse.data.refreshToken)}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        // 3. Create the user with the role
        const createGroupResponse = await axios.post(
            `${this.configService.get('guardian.url')}/api/v1/policies/${this.configService.get('policy.id')}/blocks/${this.configService.get(`blocks.create.user.${userDto.role}`)}`,
            {
                document: {
                    name: 'Dev org 9',
                    email: userDto.email,
                    role: userDto.role,
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
        console.log(createGroupResponse);

        return createGroupResponse;
    }
    private async registerGroup(userDto: UsersDTO, userLoginResponse) {
        // 1. Create a new group type (organization type) => register the organization as a organization type
        const createGroupTypeResponse = await axios.post(
            `${this.configService.get('guardian.url')}/api/v1/policies/${this.configService.get('policy.id')}/blocks/${this.configService.get('blocks.create.group.group')}`,
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

        // 2. Create a group (organization) => Create the organization
        const createGroupResponse = await axios.post(
            `${this.configService.get('guardian.url')}/api/v1/policies/${this.configService.get('policy.id')}/blocks/${this.configService.get(`blocks.create.group.${userDto.company.companyRole}`)}`,
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

        // 3. Create the required payload for group (organization) save
        const payload = await this.createPayload(
            createGroupResponse.data,
            userDto.company.companyRole,
        );

        // 4. Send request for approval
        const groupApproveResponse = await axios.post(
            `${this.configService.get('guardian.url')}/api/v1/policies/${this.configService.get('policy.id')}/blocks/${this.configService.get(`blocks.approve.${userDto.company.companyRole}`)}`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${await this.accessToken(userDto.refreshToken)}`,
                    'Content-Type': 'application/json',
                },
            },
        );

        return createGroupResponse.data;
    }
}
