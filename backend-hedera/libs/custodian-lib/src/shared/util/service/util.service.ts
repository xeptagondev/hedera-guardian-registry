import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class UtilService implements OnModuleInit {
    constructor(protected readonly configService: ConfigService) {}
    private tagToIdMap: Record<string, string> = {};
    async onModuleInit() {
        const policy = await this.loadPolicyJson();

        this.tagToIdMap = this.mapTagsToIds(policy);
        console.log(this.tagToIdMap);
    }

    private async loadPolicyJson(): Promise<any> {
        try {
            const response = await axios.get(
                `${this.configService.get('guardian.url')}${this.configService.get(
                    'guardian.policies',
                )}${this.configService.get('guardian.policy.id')}`,
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

    public getTagIdMap(): Record<string, string> {
        return this.tagToIdMap;
    }
}
