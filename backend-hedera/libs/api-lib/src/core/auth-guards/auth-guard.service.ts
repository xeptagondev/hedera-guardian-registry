import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requestType = context.getType();

        if (requestType === 'http') {
            return this.validateHttpRequest(
                context.switchToHttp().getRequest(),
            );
        }
        throw new UnauthorizedException('Unsupported request type');
    }

    private async validateHttpRequest(request: Request): Promise<boolean> {
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        return this.validateToken(token, request);
    }

    private async validateToken(
        token: string,
        requestOrClient: Request,
    ): Promise<boolean> {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('apiJwt.secret'),
            });
            requestOrClient['user'] = payload;
            return true;
        } catch {
            throw new UnauthorizedException();
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
