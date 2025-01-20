import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    autoLoadEntities: true,
    ssl:
        process.env.APP_ENV && process.env.APP_ENV != 'dev'
            ? {
                  rejectUnauthorized: false,
              }
            : false,
};

export default ormConfig;
