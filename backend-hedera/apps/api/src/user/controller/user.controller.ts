import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from '@app/common-lib/shared/login/dto/login.dto';
import { UserService } from '../service/user.service';
import { UsersDTO } from '@app/common-lib/shared/users/dto/users.dto';
import { QueryDto } from '@app/common-lib/shared/query/dto/query.dto';
import { HTTPResponseDto } from '@app/common-lib/shared/response/dto/http.response.dto';
import { AuthGuardService } from '@app/api-lib/core/auth-guards/auth-guard.service';
import { RefreshLoginDto } from '@app/common-lib/shared/login/dto/refresh.login.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<HTTPResponseDto> {
        return this.userService.login(loginDto);
    }

    @Post('login/refresh')
    async refreshLogin(@Body() refreshLogin: RefreshLoginDto) {
        return this.userService.refreshToken(refreshLogin.refreshToken);
    }

    @Post('add')
    async add(@Body() userDto: UsersDTO, @Request() req): Promise<any> {
        return this.userService.add(userDto, req);
    }

    @Post('register')
    async register(@Body() userDto: UsersDTO, @Request() req): Promise<any> {
        return this.userService.add(userDto, req);
    }

    @UseGuards(AuthGuardService)
    @Post('query')
    async query(@Body() queryDto: QueryDto, @Request() req): Promise<any> {
        return this.userService.query(queryDto, req.user);
    }
}
