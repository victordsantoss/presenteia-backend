import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import { Request } from 'express';
import { PrismaService } from '../../database/core/prisma.service';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-auth') {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  authenticate(req: Request): void {
    const authHeader = req.headers.authorization || req.headers.cookie;

    if (!authHeader) {
      return this.error(new UnauthorizedException('Token não fornecido'));
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return this.error(new UnauthorizedException('Token inválido'));
    }

    this.prisma.session
      .findFirst({
        where: {
          token,
          isActive: true,
        },
        include: {
          user: true,
        },
      })
      .then((session) => {
        if (!session) {
          return this.error(
            new UnauthorizedException(
              'Sessão expirada. Autentique-se novamente',
            ),
          );
        }

        return this.success({ id: session.user?.id ?? '', token });
      })
      .catch(() => {
        return this.error(new NotFoundException('Usuário não encontrado'));
      });
  }
}
