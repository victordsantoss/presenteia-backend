import {
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateReservationDto } from '../dtos/create-reservation.dto';
import { ReservationDto } from '../dtos/reservation.dto';
import type { ICreateReservationService } from '../services/create/create.interface';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(
    @Inject('ICreateReservationService')
    private readonly createReservationService: ICreateReservationService,
  ) {}

  @Post('gifts/:giftId')
  @ApiOperation({ summary: 'Reservar presente (público ou autenticado)' })
  @ApiResponse({
    status: 201,
    description: 'Reserva criada com sucesso.',
    type: ReservationDto,
  })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @ApiResponse({ status: 404, description: 'Presente não encontrado.' })
  @ApiBody({
    type: CreateReservationDto,
    description: 'Dados da reserva',
  })
  async create(
    @Body() reservationData: CreateReservationDto,
    @Param('giftId') giftId: string,
    @Request() req: any,
  ): Promise<ReservationDto> {
    const userId = req.user?.id;
    return await this.createReservationService.perform(
      giftId,
      reservationData,
      userId,
    );
  }
}

