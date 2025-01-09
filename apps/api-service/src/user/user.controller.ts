import { Body, Controller, Post, Request } from "@nestjs/common";
import { LoginDto } from "libs/shared/dto/login.dto";
import { UserService } from "libs/shared/api/user/src/user/user.service";
import { DataResponseDto } from "libs/shared/dto/data.response.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post("login")
  async create(@Body() loginDto: LoginDto, @Request() req): Promise<DataResponseDto> {
    return this.userService.login(loginDto, req);
  }
}
