import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import configuration from "./configuration";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          ...configService.get("database"),

          migrationsRun: false,
          migrationsTableName: "typeorm_migrations_entity",
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppConfigModule {}
