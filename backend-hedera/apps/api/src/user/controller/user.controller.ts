import { Body, Controller, Post, Request } from '@nestjs/common';
import { LoginDto } from '../../../../../libs/api-lib/src/shared/dto/login.dto';
import { UserRegisterDto } from '../../../../../libs/api-lib/src/shared/dto/user.register.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Request() req): Promise<any> {
        return this.userService.login(loginDto, req);
    }

    @Post('register')
    async register(
        @Body() userRegisterDto: UserRegisterDto,
        @Request() req,
    ): Promise<any> {
        return this.userService.register(userRegisterDto, req);
    }

    @Post('query')
    async query(
        @Body() userRegisterDto: UserRegisterDto,
        @Request() req,
    ): Promise<any> {
        return this.userService.query(userRegisterDto, req);
    }
}
