import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import configuration from "./configuration";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.configService.get<any>("database");
  }
}

const dbConfig = {
  ...configuration().database,
  migrations: [`libs/shared/src/migrations/*.{ts,js}`],
  migrationsRun: true,
  migrationsTableName: "typeorm_migrations",
};

export default new DataSource(dbConfig as DataSourceOptions);
