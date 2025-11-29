import type { CreateReservationDto } from '../../dtos/create-reservation.dto';
import type { ReservationDto } from '../../dtos/reservation.dto';

export interface ICreateReservationService {
  perform(
    giftId: string,
    reservationData: CreateReservationDto,
    userId?: string,
  ): Promise<ReservationDto>;
}
