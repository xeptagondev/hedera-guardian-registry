import { Module } from '@nestjs/common';
import { AuthGuardService } from './auth-guard.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [AuthGuardService, JwtService],
    exports: [AuthGuardService],
})
export class AuthGuardsModule {}
