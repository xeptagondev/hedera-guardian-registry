import { LoginDto } from '@app/common-lib/shared/login/dto/login.dto';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UserService {
    constructor(private readonly configService: ConfigService) {}
    async login(loginDto: LoginDto) {
        try {
            const response = await axios.post(
                this.configService.get('guardian.url') +
                    this.configService.get('guardian.login'),
                JSON.stringify(loginDto),
            );
            return response.data;
        } catch (error) {
            console.error('Error occurred while sending POST request:', error);
        }
    }
}
