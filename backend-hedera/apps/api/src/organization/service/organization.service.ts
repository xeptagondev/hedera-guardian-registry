import { HelperService } from '@app/api-lib/shared/util/service/helper.service';
import { JWTPayload } from '@app/common-lib/shared/login/dto/jwt.payload.dto';
import { OrganizationTypeEnum } from '@app/common-lib/shared/organization-type/enum/organization-type.enum';
import { OrganisationApproveDto } from '@app/common-lib/shared/organization/dto/approve.dto';
import { OrganisationDto } from '@app/common-lib/shared/organization/dto/organisation.dto';
import { OrganizationStateEnum } from '@app/common-lib/shared/organization/enum/organization.state.enum';
import { FilterEntry } from '@app/common-lib/shared/query/dto/filter.entry';
import { QueryDto } from '@app/common-lib/shared/query/dto/query.dto';
import { DataListResponseDto } from '@app/common-lib/shared/response/dto/data.list.response.dto';
import { OrganizationEntity } from '@app/custodian-lib/shared/organization/entity/organization.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
    constructor(
        private readonly configService: ConfigService,
        private readonly helperService: HelperService,
        @InjectRepository(OrganizationEntity)
        private readonly organizationsRepository: Repository<OrganizationEntity>,
    ) {}

    mapNewQueryToOldQuery(organization: OrganizationEntity) {
        return {
            companyId: organization.id,
            taxId: null,
            paymentId: null,
            name: organization.name,
            email: null,
            phoneNo: null,
            website: null,
            address: null,
            logo: 'https://carbon-common-uni.s3.amazonaws.com/profile_images%2F229_1736489123985.png',
            country: null,
            companyRole: organization.organizationType.name,
            state: organization.state,
            creditBalance: null,
            secondaryAccountBalance: null,
            programmeCount: null,
            lastUpdateVersion: null,
            creditTxTime: null,
            remarks: null,
            createdTime: null,
            geographicalLocationCordintes: null,
            regions: null,
            nameOfMinister: null,
            sectoralScope: null,
            omgePercentage: null,
            nationalSopValue: null,
            ministry: null,
            govDep: null,
        };
    }
    async approve(id: string, organizationApproveDto: OrganisationApproveDto) {
        try {
            const response = await axios.put(
                `${this.configService.get('url')}/organization/approve/${id}`,
                organizationApproveDto,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    register(organisationDto: OrganisationDto, req: any): any {
        throw new Error('Method not implemented.');
    }

    async query(
        query: QueryDto,
        requestUser: JWTPayload,
    ): Promise<DataListResponseDto> {
        this.helperService.validateRequestUser(requestUser);
        let filterWithCompanyStatesIn: OrganizationStateEnum[];

        if (
            !(
                requestUser.organizationRole ===
                    OrganizationTypeEnum.GOVERNMENT ||
                requestUser.organizationRole === OrganizationTypeEnum.MINISTRY
            )
        ) {
            filterWithCompanyStatesIn = [
                OrganizationStateEnum.SUSPENDED,
                OrganizationStateEnum.ACTIVE,
            ];
        } else {
            filterWithCompanyStatesIn = [
                OrganizationStateEnum.SUSPENDED,
                OrganizationStateEnum.ACTIVE,
                OrganizationStateEnum.REJECTED,
                OrganizationStateEnum.PENDING,
            ];
        }

        if (query.filterAnd) {
            query.filterAnd.push({
                key: 'organization"."state',
                operation: 'in',
                value: filterWithCompanyStatesIn,
            });
        } else {
            const filterAnd: FilterEntry[] = [];
            filterAnd.push({
                key: 'organization"."state',
                operation: 'in',
                value: filterWithCompanyStatesIn,
            });
            query.filterAnd = filterAnd;
        }

        //Formatting Query
        const newToOldFieldMap: Record<string, string> = {
            id: 'organization"."id',
            name: 'organization"."name',
            companyId: 'organization"."id',
        };
        query = this.helperService.mapNewWhereClausetoOldWhereClause(
            query,
            newToOldFieldMap,
        );

        const [entities, total] = await this.organizationsRepository
            .createQueryBuilder('organization')
            .leftJoin('organization.organizationType', 'organizationType')
            .addSelect(['organizationType'])
            .where(this.helperService.generateWhereSQL(query))
            .orderBy(
                query?.sort?.key && `"${query?.sort?.key}"`,
                query?.sort?.order,
                query?.sort?.nullFirst !== undefined
                    ? query?.sort?.nullFirst === true
                        ? 'NULLS FIRST'
                        : 'NULLS LAST'
                    : undefined,
            )
            .offset(query.size * query.page - query.size)
            .limit(query.size)
            .getManyAndCount();

        const oldFormatData = entities.map((organisation) =>
            this.mapNewQueryToOldQuery(organisation),
        );
        return new DataListResponseDto(
            entities ? oldFormatData : undefined,
            total ? total : undefined,
        );
    }
}
