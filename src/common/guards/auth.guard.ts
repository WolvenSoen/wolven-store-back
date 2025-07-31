import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
        throw new UnauthorizedException('Authorization header is required');
    }

    // Expecting header format: "Bearer <token>"
    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
        throw new UnauthorizedException('Invalid authorization header format');
    }

    if (token !== process.env.TOKEN_SECRET) {
        throw new UnauthorizedException('Invalid token');
    }

    return true;
}
}
