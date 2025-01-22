import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CustodianDBPopulate1737524138690 } from '../migrations/1737524138690-CustodianDBPopulate';

const ormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    autoLoadEntities: true,
    // dropSchema: true,
    logging: true,
    ssl:
        process.env.APP_ENV && process.env.APP_ENV != 'dev'
            ? {
                  rejectUnauthorized: false,
              }
            : false,
    migrations: [CustodianDBPopulate1737524138690],
    migrationsRun: true,
};

export default ormConfig;
