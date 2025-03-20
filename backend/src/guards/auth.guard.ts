import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['authorization']?.split(' ')[1]; // Bearer <token>
    if (!token) return false;

    try {
      const payload = this.jwtService.verify(token);
      request['user'] = payload; // Додаємо користувача до запиту
      return true;
    } catch {
      return false;
    }
  }
}
