import { LoginDto } from '@app/common-lib/shared/login/dto/login.dto';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AuditDTO } from '../../audit/dto/audit.dto';
import { LogLevel } from '../../audit/enum/log-level.enum';
import { AuditService } from '../../audit/service/audit.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PolicyBlocksEntity } from '../../policy-blocks/entity/policy-blocks.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class UtilService implements OnModuleInit {
    constructor(
        @InjectRepository(PolicyBlocksEntity)
        private readonly policyBlocksRepository: Repository<PolicyBlocksEntity>,
        protected readonly configService: ConfigService,
        protected readonly auditService: AuditService,
    ) {}
    private tagToIdMap: Record<string, string> = {};
    async onModuleInit() {
        const policy = await this.loadPolicyJson();
        this.tagToIdMap = this.mapTagsToIds(policy);
        await this.saveTagIdMap();
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

    private async loadPolicyJson(): Promise<any> {
        try {
            const sruLoginResponse = await this.login({
                username: this.configService.get('sru.username'),
                password: this.configService.get('sru.password'),
            });

            const response = await axios.get(
                `${this.configService.get('guardian.url')}${this.configService.get(
                    'guardian.policies',
                )}${this.configService.get('policy.id')}`,
                {
                    headers: {
                        Authorization: `Bearer ${await this.accessToken(sruLoginResponse.refreshToken)}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            return response.data;
        } catch (e) {
            throw new Error('Failed to fetch the policy');
        }
    }
    mapTagsToIds(policy) {
        const result = {};
        function traverse(block) {
            if (block.tag && block.id) {
                result[block.tag] = block.id;
            }

            if (Array.isArray(block.children)) {
                for (const child of block.children) {
                    traverse(child);
                }
            }
        }

        if (policy && policy.config) {
            traverse(policy.config);
        }

        return result;
    }

    async saveTagIdMap() {
        if (!this.tagToIdMap || Object.keys(this.tagToIdMap).length === 0) {
            return;
        }
        try {
            const tagIdMap = this.tagToIdMap;

            const policyBlocks = Object.entries(tagIdMap).map(
                ([blockName, blockId]) => ({
                    blockName,
                    blockId,
                    policyId: this.configService.get<string>('policy.id'),
                }),
            );

            const existingBlocks = await this.policyBlocksRepository.find({
                where: { blockId: In(Object.values(tagIdMap)) },
            });

            const existingBlockIds = existingBlocks.map(
                (block) => block.blockId,
            );

            const newPolicyBlocks = policyBlocks.filter(
                (block) => !existingBlockIds.includes(block.blockId),
            );

            if (newPolicyBlocks.length === 0) {
                return;
            }

            await this.policyBlocksRepository.save(newPolicyBlocks);
        } catch (error) {
            throw new Error('Failed to save tagIdMap to PolicyBlocksEntity');
        }
    }

    public getTagIdMap(): Record<string, string> {
        return this.tagToIdMap;
    }
}
