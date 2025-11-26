import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { CreateGiftDto } from '../dtos/create-gift.dto';
import { GiftDto } from '../dtos/gift.dto';
import { GiftWithAvailabilityDto } from '../dtos/gift-with-availability.dto';
import type { ICreateGiftService } from '../services/create/create.interface';
import type { IListGiftsByEventService } from '../services/list-by-event/list-by-event.interface';

@ApiTags('Gifts')
@Controller('gifts')
export class GiftController {
  constructor(
    @Inject('ICreateGiftService')
    private readonly createGiftService: ICreateGiftService,
    @Inject('IListGiftsByEventService')
    private readonly listGiftsByEventService: IListGiftsByEventService,
  ) {}

  @Post('events/:eventId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Adicionar presente ao evento' })
  @ApiResponse({
    status: 201,
    description: 'Presente criado com sucesso.',
    type: GiftDto,
  })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @ApiResponse({ status: 404, description: 'Evento não encontrado.' })
  @ApiBody({
    type: CreateGiftDto,
    description: 'Dados do presente',
  })
  async create(
    @Body() giftData: CreateGiftDto,
    @Param('eventId') eventId: string,
    @Request() req: any,
  ): Promise<GiftDto> {
    return await this.createGiftService.perform(giftData, eventId);
  }

  @Get('events/:eventId')
  @ApiOperation({ summary: 'Listar presentes do evento com disponibilidade' })
  @ApiResponse({
    status: 200,
    description: 'Lista de presentes com informações de disponibilidade.',
    type: [GiftWithAvailabilityDto],
  })
  @ApiResponse({ status: 404, description: 'Evento não encontrado.' })
  async listByEvent(
    @Param('eventId') eventId: string,
  ): Promise<GiftWithAvailabilityDto[]> {
    return await this.listGiftsByEventService.perform(eventId);
  }
}

