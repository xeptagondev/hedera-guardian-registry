import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataResponseDto } from "libs/shared/dto/data.response.dto";
import { LoginDto } from "libs/shared/dto/login.dto";
import { UserEntity } from "libs/shared/entities/api/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async login(loginDto: LoginDto, req: any): Promise<DataResponseDto> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: loginDto.username,
          password: loginDto.password,
        },
      });
      return new DataResponseDto(HttpStatus.OK, {
        message: "content",
        id: "",
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
