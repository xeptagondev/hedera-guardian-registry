import { NestFactory } from '@nestjs/core';
import { CustodianModule } from './custodian.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(CustodianModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );
    await app.listen(process.env.CUSTODIAN_PORT || 3002);
}

bootstrap();
