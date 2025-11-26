import { Injectable, Logger } from '@nestjs/common';
import { BaseRepository } from '../../../common/repositories/base.repository';
import type { ISessionRepository } from './session.repository.interface';
import type { Session } from '@prisma/client';
import type { GetAuthenticatedUserResponseDto } from '../dtos/get-user.response.dto';
import { PrismaService } from '../../../database/core/prisma.service';

@Injectable()
export class SessionRepository
  extends BaseRepository<Session>
  implements ISessionRepository
{
  private readonly logger = new Logger(SessionRepository.name);
  constructor(prisma: PrismaService) {
    super(prisma, 'session');
  }

  async findActiveSessionsByUserId(userId: string): Promise<Session[]> {
    this.logger.log(`Buscando sessões ativas do usuário: ${userId}`);
    return this.prisma.session.findMany({
      where: {
        user: { id: userId },
        endDate: null,
        isActive: true,
      },
      include: {
        user: true,
      },
    });
  }

  async findActiveUserByToken(
    token: string,
  ): Promise<GetAuthenticatedUserResponseDto> {
    this.logger.log(`Buscando usuário ativo por token: ${token}`);
    return this.prisma.session.findFirst({
      where: {
        token: token,
        endDate: null,
        isActive: true,
      },
      select: {
        id: true,
        token: true,
        isActive: true,
        startDate: true,
        endDate: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
            provider: true,
            birthDate: true,
            createdAt: true,
            updatedAt: true,
            roleId: true,
            isActive: true,
          },
        },
      },
    });
  }
}
