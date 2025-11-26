import { Module } from '@nestjs/common';
import { ReservationController } from './controllers/reservation.controller';
import { ReservationRepository } from './repositories/reservation.repository';
import { CreateReservationService } from './services/create/create.service';
import { PrismaModule } from '../../database/database.module';
import { CommonModule } from '../../common/common.module';
import { GiftModule } from '../gift/gift.module';

@Module({
  imports: [PrismaModule, CommonModule, GiftModule],
  controllers: [ReservationController],
  providers: [
    {
      provide: 'ICreateReservationService',
      useClass: CreateReservationService,
    },
    {
      provide: 'IReservationRepository',
      useClass: ReservationRepository,
    },
  ],
  exports: ['ICreateReservationService', 'IReservationRepository'],
})
export class ReservationModule {}

