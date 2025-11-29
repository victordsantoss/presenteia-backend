import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { ICreateReservationService } from './create.interface';
import type { CreateReservationDto } from '../../dtos/create-reservation.dto';
import type { ReservationDto } from '../../dtos/reservation.dto';
import type { IReservationRepository } from '../../repositories/reservation.interface';
import type { IGiftRepository } from '../../../gift/repositories/gift/gift.interface';
import { Reservation, Prisma } from '@prisma/client';

@Injectable()
export class CreateReservationService implements ICreateReservationService {
  private readonly logger = new Logger(CreateReservationService.name);

  constructor(
    @Inject('IReservationRepository')
    private readonly reservationRepository: IReservationRepository,
    @Inject('IGiftRepository')
    private readonly giftRepository: IGiftRepository,
  ) {}

  async perform(
    giftId: string,
    reservationData: CreateReservationDto,
    userId?: string,
  ): Promise<ReservationDto> {
    this.logger.log(`Iniciando processo de reserva do presente: ${giftId}`);

    if (!userId && !reservationData.guestName) {
      throw new BadRequestException(
        'Para reservas sem login, o nome é obrigatório',
      );
    }

    const gift = await this.giftRepository.findById(giftId);
    if (!gift) {
      throw new NotFoundException('Presente não encontrado');
    }

    if (!gift.isActive) {
      throw new BadRequestException('Este presente não está mais disponível');
    }

    await this.validateAvailability(gift, reservationData.contributionAmount);

    const guestToken = !userId ? randomUUID() : null;

    const reservationPayload: Prisma.ReservationCreateInput = {
      contributionAmount: reservationData.contributionAmount,
      message: reservationData.message,
      guestName: reservationData.guestName,
      guestEmail: reservationData.guestEmail,
      guestPhone: reservationData.guestPhone,
      guestToken,
      gift: {
        connect: { id: giftId },
      },
      ...(userId && {
        user: {
          connect: { id: userId },
        },
      }),
    };

    const createdReservation =
      await this.reservationRepository.create(reservationPayload);

    this.logger.log(`Reserva criada com sucesso: ${createdReservation.id}`);

    // TODO: Enviar email com token se for guest
    // TODO: Notificar organizador
    return this.normalizeResponse(createdReservation);
  }

  private async validateAvailability(
    gift: any,
    contributionAmount: number,
  ): Promise<void> {
    const activeReservations =
      await this.reservationRepository.findActiveByGiftId(gift.id);

    if (gift.allowMultipleContributions) {
      const totalContributed = activeReservations.reduce(
        (sum, r) => sum + Number(r.contributionAmount),
        0,
      );
      const remaining = Number(gift.price) - totalContributed;

      if (contributionAmount > remaining) {
        throw new BadRequestException(
          `Valor excede o restante necessário: R$ ${remaining.toFixed(2)}`,
        );
      }
    } else {
      const reservedCount = activeReservations.length;
      if (reservedCount >= gift.quantity) {
        throw new BadRequestException(
          'Este presente já foi totalmente reservado',
        );
      }
      if (contributionAmount !== Number(gift.price)) {
        throw new BadRequestException(
          `Valor deve ser R$ ${Number(gift.price).toFixed(2)}`,
        );
      }
    }
  }

  private normalizeResponse(reservation: Reservation): ReservationDto {
    return {
      id: reservation.id,
      giftId: reservation.giftId,
      userId: reservation.userId ?? undefined,
      guestName: reservation.guestName ?? undefined,
      guestEmail: reservation.guestEmail ?? undefined,
      guestPhone: reservation.guestPhone ?? undefined,
      guestToken: reservation.guestToken ?? undefined,
      contributionAmount: Number(reservation.contributionAmount),
      status: reservation.status,
      message: reservation.message ?? undefined,
      reservedAt: reservation.reservedAt,
      confirmedAt: reservation.confirmedAt ?? undefined,
      deliveredAt: reservation.deliveredAt ?? undefined,
    };
  }
}
