import { LoginDto } from '@app/api-lib/shared/dto/login.dto';
import { UserRegisterDto } from '@app/api-lib/shared/dto/user.register.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    query(userRegisterDto: UserRegisterDto, req: any): any {
        throw new Error('Method not implemented.');
    }
    register(userRegisterDto: UserRegisterDto, req: any): any {
        throw new Error('Method not implemented.');
    }
    login(loginDto: LoginDto, req: any): any {
        throw new Error('Method not implemented.');
    }
}
