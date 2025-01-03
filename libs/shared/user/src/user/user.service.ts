import { Injectable } from "@nestjs/common";
import { LoginDto } from "libs/shared/dto/login.dto";

@Injectable()
export class UserService {
  login(loginDto: LoginDto, req: any): any {
    throw new Error("Method not implemented.");
  }
}
