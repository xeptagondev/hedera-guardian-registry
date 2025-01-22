import { QueryDto } from '@app/common-lib/shared/query/dto/query.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { UsersDTO } from '@app/common-lib/shared/users/dto/users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '@app/custodian-lib/shared/users/entity/users.entity';
import { Repository } from 'typeorm';
import { HTTPResponseDto } from '@app/common-lib/shared/response/dto/http.response.dto';
import { JwtService } from '@nestjs/jwt';
import { DataListResponseDto } from '@app/common-lib/shared/response/dto/data.list.response.dto';
import { LoginDto } from '@app/common-lib/shared/login/dto/login.dto';
import { OrganizationService } from '../../organization/service/organization.service';
import { OrganizationEntity } from '@app/custodian-lib/shared/organization/entity/organization.entity';
import { FilterEntry } from '@app/common-lib/shared/query/dto/filter.entry';
import { HelperService } from '@app/api-lib/shared/util/service/helper.service';
import { JWTPayload } from '@app/common-lib/shared/login/dto/jwt.payload.dto';
import { OrganizationStateEnum } from '@app/common-lib/shared/organization/enum/organization.state.enum';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
    constructor(
        private readonly organizationService: OrganizationService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        private readonly helperService: HelperService,
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>,
        @InjectRepository(OrganizationEntity)
        private readonly organizationsRepository: Repository<OrganizationEntity>,
    ) {}

    async query(query: QueryDto, user: any): Promise<DataListResponseDto> {
        try {
            if (query.filterAnd) {
                if (
                    !query.filterAnd.some(
                        (filter) => filter.key === 'isPending',
                    )
                ) {
                    query.filterAnd.push({
                        key: 'isPending',
                        operation: '=',
                        value: false,
                    });
                }
            } else {
                const filterAnd: FilterEntry[] = [];
                filterAnd.push({
                    key: 'isPending',
                    operation: '=',
                    value: false,
                });
                query.filterAnd = filterAnd;
            }

            const resp = await this.usersRepository
                .createQueryBuilder('user')
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

            return new DataListResponseDto(
                resp.length > 0 ? resp[0] : undefined,
                resp.length > 1 ? resp[1] : undefined,
            );
        } catch (e) {
            throw new HttpException(
                'Method not implemented.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async add(userDto: UsersDTO, user: any) {
        try {
            const custodianResponse = await axios.post(
                this.configService.get('url') +
                    this.configService.get('user.add'),
                userDto,
            );
            if (custodianResponse.status == HttpStatus.CREATED) {
                return custodianResponse.data;
            } else {
                throw new HttpException(
                    'Error occured with Guardian connection',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        } catch (error) {
            throw new HttpException(
                'Error occurred while sending POST request:',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    // Access Token Generation
    async generateAccessToken(
        userId: number,
        organisationId: number,
    ): Promise<string> {
        const organisationDetails = await this.organizationsRepository.findOne({
            where: { id: organisationId },
            relations: {
                organizationType: true,
            },
        });

        if (!organisationDetails) {
            throw new HttpException(
                'Organization not found',
                HttpStatus.UNAUTHORIZED,
            );
        }

        const user = await this.usersRepository.findOne({
            where: {
                id: userId,
            },
            relations: {
                organization: true,
                guardianRole: {
                    role: true,
                    organizationType: true,
                },
            },
        });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        const payload = new JWTPayload(
            organisationDetails.name,
            user.name,
            user.id,
            user.guardianRole.role.name,
            user.organization.id,
            organisationDetails.organizationType.name,
            parseInt(organisationDetails.state),
        );

        return this.jwtService.signAsync(instanceToPlain(payload), {
            secret: this.configService.get<string>('apiJwt.secret'),
        });
    }

    async refreshToken(refreshToken: string) {
        if (!refreshToken) {
            throw new HttpException('JWT Expired', HttpStatus.UNAUTHORIZED);
        }

        let userId: number;
        let companyId: number;

        try {
            const decoded = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>(
                    'apiJwt.refreshTokenSecret',
                ),
            });
            userId = decoded.userId;
            companyId = decoded.companyId;
        } catch (_) {
            throw new HttpException(
                'Refresh Token Verification Failed',
                HttpStatus.UNAUTHORIZED,
            );
        }

        try {
            const generatedAccessToken = await this.generateAccessToken(
                userId,
                companyId,
            );
            return { access_token: generatedAccessToken };
        } catch (_) {
            throw new HttpException(
                'Refresh Token Generation Failed',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async login(loginDto: LoginDto): Promise<HTTPResponseDto> {
        const response = new HTTPResponseDto();
        const user = await this.usersRepository.findOne({
            where: {
                email: loginDto.username.trim().toLowerCase(),
            },
            relations: {
                organization: true,
                guardianRole: {
                    role: true,
                    organizationType: true,
                },
            },
        });
        if (!user || !loginDto.password) {
            throw new HttpException(
                'Email or Password is Incorrect',
                HttpStatus.UNAUTHORIZED,
            );
        }

        const custodianResponse = await axios.post(
            this.configService.get('url') +
                this.configService.get('user.login'),
            loginDto,
        );
        if (custodianResponse.status == HttpStatus.CREATED) {
            const organization = await this.organizationsRepository.findOne({
                where: { id: user.organization.id },
                relations: {
                    organizationType: true,
                },
            });
            if (
                !organization ||
                organization.state == OrganizationStateEnum.PENDING
            ) {
                throw new HttpException(
                    'Organization not found or Activate',
                    HttpStatus.UNAUTHORIZED,
                );
            }

            // Refresh Token Generation
            const refreshPayload = {
                userId: user.id,
                companyId: organization.id,
                role: user.guardianRole.role.name,
                companyRole: organization.organizationType.name,
            };

            const refreshToken = this.jwtService.sign(refreshPayload, {
                secret: this.configService.get<string>(
                    'apiJwt.refreshTokenSecret',
                ),
                expiresIn: this.configService.get<string>(
                    'apiJwt.refreshTokenExpireTimeout',
                ),
            });

            response.statusCode = HttpStatus.OK;
            response.data = {
                access_token: await this.generateAccessToken(
                    user.id,
                    organization.id,
                ),
                refresh_token: refreshToken,
                role: user.guardianRole?.role?.name,
                id: user.id,
                name: user.name,
                companyId: organization.id,
                companyRole: organization.organizationType.name,
                companyName: organization.name,
                companyLogo:
                    'https://carbon-common-uni.s3.amazonaws.com/profile_images%2F228_1736221366674.png', // Will be removed after database changes
                companyState: parseInt(organization.state),
            };
            return response;
        } else {
            throw new HttpException(
                'Email or Password is Incorrect',
                HttpStatus.UNAUTHORIZED,
            );
        }
    }
}
