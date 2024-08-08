import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BearerTokenGuard implements CanActivate {
  constructor(
    private httpService: HttpService,
    private authService: AuthService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Bearer token is missing');
    }

    return this.validateToken(token, request);
  }

  private async validateToken(token: string, request: any): Promise<boolean> {
    try {
      const validationUrl = process.env.BILLOR_GATE_URL;
      const response = await this.httpService
        .post(
          validationUrl,
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        )
        .toPromise();
      if (response.data.result.user) {
        request.user = response.data.result.user;
        return true;
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
