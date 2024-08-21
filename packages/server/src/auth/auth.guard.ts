import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

import { SetMetadata } from '@nestjs/common';
import { jwtConstants, responseCode } from '@/common/configs/constants';
import { UserException } from '@/common/exceptions/custom.exception';

export const IS_PUBLIC_KEY = 'isPublic';
export const APP_KEY = 'APP_KEY';
export const ROLES_KEY = 'roles';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const App = (key: string) => SetMetadata(APP_KEY, key);
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const isApp = this.reflector.getAllAndOverride<string>(APP_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();

    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (roles && roles.length > 0) {
      const userRole = request.session?.user?.role;
      if (userRole) {
        if (!roles.includes(userRole)) {
          throw new UserException('暂无权限', responseCode.FORBIDDEN);
        }
      } else {
        throw new UserException('暂无权限', responseCode.FORBIDDEN);
      }
    }

    const appKey = this.exyractHeaders(request, 'app-key');
    if (isApp && appKey === isApp) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UserException('会话过期或鉴权失败', responseCode.UNAUTHORIZED);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload;
    } catch {
      throw new UserException('会话过期或鉴权失败', responseCode.UNAUTHORIZED);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private exyractHeaders(request: Request, key: string) {
    return request.headers[key];
  }
}
