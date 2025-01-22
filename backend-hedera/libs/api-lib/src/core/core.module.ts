import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { AuthGuardsModule } from './auth-guards/auth-guards.module';

@Module({
    imports: [AppConfigModule, AuthGuardsModule],
    exports: [AppConfigModule, AuthGuardsModule],
})
export class CoreModule {}
