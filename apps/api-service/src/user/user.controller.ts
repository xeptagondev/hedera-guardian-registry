import { Body, Controller, Post, Request } from "@nestjs/common";
import { LoginDto } from "libs/shared/dto/login.dto";
import { UserService } from "libs/shared/user/src/user/user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post("login")
  async create(@Body() loginDto: LoginDto, @Request() req): Promise<any> {
    return this.userService.login(loginDto, req);
  }
}
