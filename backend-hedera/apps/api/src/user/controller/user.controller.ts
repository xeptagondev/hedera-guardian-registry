import { Body, Controller, Post, Request } from '@nestjs/common';
import { LoginDto } from '../../../../../libs/common-lib/src/shared/login/dto/login.dto';
import { UserService } from '../service/user.service';
import { QueryDto } from '@app/api-lib/shared/dto/query.dto';
import { UsersDTO } from '@app/common-lib/shared/users/dto/users.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Request() req): Promise<any> {
        return this.userService.login(loginDto, req);
    }

    @Post('add')
    async register(@Body() userDto: UsersDTO, @Request() req): Promise<any> {
        return this.userService.add(userDto, req);
    }

    @Post('query')
    async query(@Body() queryDto: QueryDto, @Request() req): Promise<any> {
        return this.userService.query(queryDto, req);
    }
}
