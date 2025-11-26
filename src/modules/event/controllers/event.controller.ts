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
import { ApiBody, ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateEventDto } from '../dtos/create-event.dto';
import { EventDto } from '../dtos/event.dto';
import type { ICreateEventService } from '../services/create/create.interface';
import type { IGetEventService } from '../services/get/get.interface';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';

@ApiTags('events')
@Controller('events')
export class EventController {
  constructor(
    @Inject('ICreateEventService')
    private readonly createEventService: ICreateEventService,
    @Inject('IGetEventService')
    private readonly getEventService: IGetEventService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Criar um novo evento' })
  @ApiResponse({ status: 201, description: 'Evento criado com sucesso.', type: EventDto })
  @ApiResponse({ status: 400, description: 'Erro de validação.' })
  @ApiResponse({ status: 401, description: 'Não autorizado.' })
  @ApiBody({
    type: CreateEventDto,
    description: 'Dados de criação do evento',
  })
  async create(
    @Body() eventData: CreateEventDto,
    @Request() req: any,
  ): Promise<EventDto> {
    const userId = req.user.id;
    return await this.createEventService.perform(eventData, userId);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Buscar evento pelo slug' })
  @ApiResponse({ status: 200, description: 'Evento encontrado.', type: EventDto })
  @ApiResponse({ status: 404, description: 'Evento não encontrado.' })
  async getBySlug(@Param('slug') slug: string): Promise<EventDto> {
    return await this.getEventService.perform(slug);
  }
}

