import { LoginDto } from '@app/common-lib/shared/login/dto/login.dto';
import { Controller, Post, Body, Request } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post('login')
    async login(@Body() loginDto: LoginDto, @Request() req): Promise<any> {
        return this.userService.login(loginDto);
    }
}
